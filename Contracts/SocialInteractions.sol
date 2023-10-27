// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./UserManager.sol";
import "./OrganizationManagement.sol";
import "./EventManagement.sol";

contract SocialInteractions {

    struct Post {
        uint256 postId;
        address creator; // can be a user or an organization
        string content;
        uint256 timestamp;  // post creation time
        bool isDeleted;
    }

    struct Comment {
        uint256 commentId;
        uint256 postId;
        address commentator;
        string content;
        uint256 timestamp;
        bool isDeleted;
    }

    uint256 private postCounter = 0;
    uint256 private commentCounter = 0;
    mapping(uint256 => Post) private posts;
    mapping(uint256 => Comment[]) private postComments;
    mapping(uint256 => uint256) private postLikes;
    mapping(uint256 => mapping(address => bool)) private postLikedByUser;

    UserManager private userManager;
    OrganizationManagement private organizationManagement;
    EventManagement private eventManagement;

    modifier onlyRegisteredEntity() {
        require(
            userManager.isUserRegistered(msg.sender) || 
            organizationManagement.isOrganizationRegistered(msg.sender),
            "Only registered users or organizations can perform this action"
        );
        _;
    }

    constructor(address _userManager, address _organizationManagement, address _eventManagement) {
        userManager = UserManager(_userManager);
        organizationManagement = OrganizationManagement(_organizationManagement);
        eventManagement = EventManagement(_eventManagement);
    }

    function createPost(string memory _content) public onlyRegisteredEntity returns(uint256) {
        postCounter++;
        posts[postCounter] = Post(postCounter, msg.sender, _content, block.timestamp, false);
        return postCounter;
    }

    function likePost(uint256 _postId) external onlyRegisteredEntity {
        require(!posts[_postId].isDeleted, "Post has been deleted");
        require(!postLikedByUser[_postId][msg.sender], "You've already liked this post");
        
        postLikes[_postId]++;
        postLikedByUser[_postId][msg.sender] = true;
    }

    function commentOnPost(uint256 _postId, string memory _content) external onlyRegisteredEntity returns(uint256) {
        require(!posts[_postId].isDeleted, "Post has been deleted");

        commentCounter++;
        Comment memory newComment = Comment(commentCounter, _postId, msg.sender, _content, block.timestamp, false);
        postComments[_postId].push(newComment);
        return commentCounter;
    }

    function deletePost(uint256 _postId) external onlyRegisteredEntity {
        require(posts[_postId].creator == msg.sender, "Only the post creator can delete this post");
        posts[_postId].isDeleted = true;
    }

    // The sharePost function would ideally just be invoking createPost to share existing content.
    function sharePost(uint256 _postId) external onlyRegisteredEntity returns(uint256) {
        require(!posts[_postId].isDeleted, "Post has been deleted");
        
        return createPost(string(abi.encodePacked("Shared: ", posts[_postId].content)));
    }

    // Getter functions for viewing posts, comments, and likes can be added as needed.
    // Getter functions
function getPost(uint256 _postId) external view returns(Post memory) {
    require(!posts[_postId].isDeleted, "Post has been deleted");
    return posts[_postId];
}

function getPostLikes(uint256 _postId) external view returns(uint256) {
    require(!posts[_postId].isDeleted, "Post has been deleted");
    return postLikes[_postId];
}

function getCommentsOnPost(uint256 _postId) external view returns(Comment[] memory) {
    require(!posts[_postId].isDeleted, "Post has been deleted");
    return postComments[_postId];
}

function getComment(uint256 _commentId) external view returns(Comment memory) {
    // Searching for the comment across all posts. This is inefficient for large data, but it's a simple approach.
    for(uint256 i = 1; i <= postCounter; i++) {
        for(uint256 j = 0; j < postComments[i].length; j++) {
            if(postComments[i][j].commentId == _commentId) {
                return postComments[i][j];
            }
        }
    }
    revert("Comment not found");
}

}

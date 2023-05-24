function blogDetailsDTO(blog) {
    return {
        _id: blog._id,
        title: blog.title,
        content: blog.content,
        photoPath: blog.photoPath,
        createdAt: blog.createdAt,
        authorName: blog.author.name,
        authorEmail: blog.author.email,
        authorUserName: blog.author.userName
    };
}
module.exports = blogDetailsDTO;

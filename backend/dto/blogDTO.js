function blogDTO(blog) {
    return {
        _id: blog._id,
        author: blog.author,
        title: blog.title,
        content: blog.content,
        photoPath: blog.photoPath,
    };
}
module.exports = blogDTO;

const {User, Group, Book, Comment, Note, BookGroup, UserBook, UserGroup} = require('./index.js')

//Check or Add new user to the database.
//Then, retrieve all group data for that user

const verifyUser = (email, username) => {
    return User.findOrCreate({
        where: { email: email },
        defaults: { username: username }
    }).then((result) => {
        return result;
    })
}

const getOwnerGroups = (userId) => {
    return Group.findAll({
    where: {
        userId: userId,
    },
    include: [
        { model: User },
        { model: Book }
    ]
}).then((result) => {
    return result;
}).catch((err) => {  
    return err
});
}

const createNewGroup = (userId, groupName, bookId) => {
    return Group.create({
        name: groupName,
        userId: userId,
        bookId: bookId || null,
    }) .then((result) => {
        return result;
    }).catch((err) => {
        return err;
    });
}

const addOrFindBook = (isbn, title, author, published, description, urlInfo, image) => {
    return Book.findOrCreate({
        where: { isbn: isbn },
        defaults: {
        title: title,
        author: author,
        published: published,
        urlInfo: urlInfo,
        description: description,
        image: image,
        }
    }) .then((result) => {
        return result;
    }).catch((err) => {
        return err;
    });
}

const getUserGroups = (userId) => {
    return UserGroup.findAll({
        attributes: [],
        where: {
            userId: userId,
        },
        include: [{ 
                model: Group, 
                include: [Book],
            },
        ]
    }).then((result) => {
        let groups = result.map(group => {
            return group.group
        })
        return groups; 
    }).catch((err) => {
        return err;
    });
}

const addUserToGroup = (userId, groupId) => {
    return UserGroup.findOrCreate({
        where: {userId: userId, groupId: groupId},
    }).then((result) => {
        return result;  
    }).catch((err) => {
        return err;
    });
}

const getGroupUsers = (groupId) => {
    return UserGroup.findAll({
        attributes: [],
            where: {
                groupId: groupId,
            },
            include: [
                { model: User},
            ]
    }).then((result) => {
        let users = result.map(user => {
            return user.user
        })
        return users; 
    }).catch((err) => {
        return err;
    });
}

const addBookToGroup = (groupId, bookId) => {
    return BookGroup.findOrCreate({
        where: {bookId: bookId, groupId: groupId},
    }).then((result) => {
        return result;  
    }).catch((err) => {
        return err;
    });
}

const getGroupBooks = (groupId) => {
    return BookGroup.findAll({
        attributes: [],
            where: {
                groupId: groupId,
            },
            include: [
                { model: Book},
            ]
    }).then((result) => {
        let book = result.map(book => {
            return book.book
        })
        return book; 
    }).catch((err) => {
        return err;
    });
}

const addComment = (userId, groupId, bookId) => {

}

const getAllComments = (groupId, bookId) => {

}
module.exports = {
    verifyUser,
    createNewGroup,
    getUserGroups,
    addOrFindBook,
    getOwnerGroups,
    addUserToGroup,
    getGroupUsers,
    addBookToGroup,
    getGroupBooks,
    addComment,
    getAllComments,
}
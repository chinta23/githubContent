'use strict'

export function setUser(user) {
    return {
        type: 'SET_USER',
        name: user.name,
        email: user.email
    };
};

const initialState = {
    name: '',
    email: ''
};

export default function user(state = initialState, action) {
    switch (action.type) {

        case 'SET_USER':
            return {
                ...state,
                name: action.name,
                email: action.email
            };

        default:
            return state;
    }
};

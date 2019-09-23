import makeid from '../../../../utils/HelperFunctions'
export const INITIAL_STATE = {
    name: '',
    code: '',
    sellType: 0,
    category: 0,
    options: [
        {
            key: makeid(5),
            name: '',
            price: 0,
            index: 0
        },

    ],
    post: {
        "time": 1554920381017,
        "category": 0,
        "blocks": [
            {
                "type": "image",
                "data": {
                    "caption": "",
                    "file": {
                        "url": "http://barilgachin.mn/cache/images/4/3/0/b/f/430bf3704d1df6ec112fdf525ed30c300b87bb6d.png",
                    }
                },
            },
        ],
        "version": "2.14"
    },
    dialog: false,
};
const mergeDeeply = require('../src/index.js');

const a = {
    familyName: 'Oda',
    firstName: 'Kippoushi',
    address: 'Owari',
    sex: 'male',
    details:
        {
            character:
                {
                    favoriteTactics: 'surprise attack',
                    favoriteWord: 'world conquest',
                    favoritePlace: 'Kyoto'
                },
            ownedCastle: ['Kiyosu-castle']
        }
};

const b = {
    familyName: 'Oda',
    firstName: 'Nobunaga',
    details:
        {
            character: {favoriteTactics: 'attack by gun-army'},
            ownedCastle: ['Gifu-castle', 'Azuchi-castle']
        }
};

const result = mergeDeeply(a, b, {concatArray: true});
console.log(result);
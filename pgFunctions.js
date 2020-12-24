

module.exports = {
    auth: {
        usp_login: 'SELECT * FROM usp_login($1)',
    },
    pool: {
        usp_getPoolsAndDetails: 'SELECT * FROM "usp_getPoolsAndDetails"()',
        usp_addPool: 'SELECT * FROM "usp_addPool"($1, $2, $3, $4)',
        usp_deletePool: 'SELECT * FROM "usp_deletePool"($1)',
        usp_updatePool: 'SELECT * FROM "usp_updatePool"($1, $2, $3, $4, $5)',

        sale: {
            usp_fishOut: 'SELECT * FROM "usp_fishOut"($1, $2, $3, $4, $5, $6)',
        },
        movement: {
            usp_fishMove: 'SELECT * FROM "usp_fishMove"($1, $2, $3, $4, $5, $6)',
        }
    },
    fish: {
        usp_getFishes: 'SELECT * FROM "usp_getFishes"()',
        usp_addFish: 'SELECT * FROM "usp_addFish"($1, $2)',
        usp_deleteFish: 'SELECT * FROM "usp_deleteFish"($1)',
        usp_updateFish: 'SELECT * FROM "usp_updateFish"($1, $2, $3)',
    },
    food: {
        usp_getFoods: 'SELECT * FROM "usp_getFoods"()',
        usp_addFood: 'SELECT * FROM "usp_addFood"($1, $2, $3, $4)',
        usp_deleteFood: 'SELECT * FROM "usp_deleteFood"($1)',
        usp_updateFood: 'SELECT * FROM "usp_updateFood"($1, $2, $3, $4, $5)',
    },
    partner: {
        usp_getPartners: 'SELECT * FROM "usp_getPartners"()',
        usp_addPartner: 'SELECT * FROM "usp_addPartner"($1, $2, $3)',
        usp_deletePartner: 'SELECT * FROM "usp_deletePartner"($1)',
        usp_updatePartner: 'SELECT * FROM "usp_updatePartner"($1, $2, $3, $4)',
    }

}
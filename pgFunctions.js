

module.exports = {
    usp_login: 'SELECT * FROM usp_login($1)',
    usp_getpools: 'SELECT * FROM usp_getpools()',
    usp_addpool: 'SELECT * FROM usp_addpool($1, $2, $3, $4)',
    usp_deletepool: 'SELECT * FROM usp_deletepool($1)',
    usp_updatepool: 'SELECT * FROM usp_updatepool($1, $2, $3, $4, $5)'
}
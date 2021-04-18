const buildUrl = (year) => {
    const baseUrl = 'http://localhost:5000'
    return baseUrl + '/territories/' + year
}

export default buildUrl
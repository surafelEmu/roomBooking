const {stringify , parse} = require('flatted')
class APIFeatures {
    constructor(query , queryStr) {
        this.query = query ;
        this.queryStr = query ;
    }

    search() {
        const keyword = this.queryStr.keyword ?{
            name: {
                $regex: this.queryStr.keyword ,
                $options: 'i'
            }
        }: {}

        this.query = this.query.find({ ...keyword}) ;

        return this ;

    }
    filter() {
        const queryCopy = { ...this.queryStr };

        // Removing fields from the query
        const removeFields = ['keyword', 'limit', 'page']
        removeFields.forEach(el => delete queryCopy[el]);

        // Advance filter for price, ratings etc
        let queryStr = stringify(queryCopy)
        //queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, match => `$${match}`)


        this.query = this.query.find(parse(queryStr.replace(/\b(gt|gte|lt|lte)\b/g, match => `$${match}`)));
        return this;
    } 

    pagination(resPerPage) {
        const currentPage = Number(this.queryStr) || 1 ;
        const skip = resPerPage * (currentPage - 1) ;

        this.query = this.query.limit(resPerPage).skip(skip) ;
        return this ;
    }

}

module.exports = APIFeatures
class ApiFeatures {
   constructor(query, queryStr) {
      this.query = query;
      this.queryStr = queryStr;
   }

   searchByName() {
      const keyword = this.queryStr.name
         ? {
              name: {
                 $regex: this.queryStr.name,
                 $options: "i",
              },
           }
         : {};
      this.query = this.query.find({ ...keyword });
      return this;
   }

   filter() {
      const queryCopy = { ...this.queryStr };
      const removeFields = ["name", "page", "limit"];

      removeFields.forEach(key => {
         delete queryCopy[key];
      });

      //filter for rate and rating.
      let queryStr = JSON.stringify(queryCopy);
      queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, key => `$${key}`);
      this.query = this.query.find({
         ...JSON.parse(queryStr),
         quantity: { $gte: "1" },
      });
      return this;
   }

   pagination(resultPerPage) {
      const currentPage = Number(this.queryStr.page) || 1;

      const skip = resultPerPage * (currentPage - 1);

      this.query = this.query.limit(resultPerPage).skip(skip);

      return this;
   }
}

module.exports = ApiFeatures;

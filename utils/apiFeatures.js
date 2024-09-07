class APIFeatures {
   constructor(query, queryString) {
      this.query = query // Knex query object
      this.queryString = queryString // Incoming query parameters from request
   }

   // 1) Filter logic
   filter() {
      const queryObj = { ...this.queryString }
      const excludedFields = [
         'page',
         'sort',
         'limit',
         'fields',
         'startDate',
         'endDate',
         'timeFrame',
      ]
      excludedFields.forEach((el) => delete queryObj[el])

      // Advanced filtering (for numeric filters like gte, gt, lte, lt)
      let queryStr = JSON.stringify(queryObj)
      queryStr = queryStr.replace(
         /\b(gte|gt|lte|lt)\b/g,
         (match) => `_${match}`
      )

      const filters = JSON.parse(queryStr)

      // Apply filters to the query
      Object.keys(filters).forEach((key) => {
         if (key.endsWith('_gte')) {
            this.query = this.query.where(
               key.replace('_gte', ''),
               '>=',
               filters[key]
            )
         } else if (key.endsWith('_gt')) {
            this.query = this.query.where(
               key.replace('_gt', ''),
               '>',
               filters[key]
            )
         } else if (key.endsWith('_lte')) {
            this.query = this.query.where(
               key.replace('_lte', ''),
               '<=',
               filters[key]
            )
         } else if (key.endsWith('_lt')) {
            this.query = this.query.where(
               key.replace('_lt', ''),
               '<',
               filters[key]
            )
         } else {
            this.query = this.query.where(key, filters[key])
         }
      })

      // Handle date filtering
      this.filterByDate()

      return this
   }

   // 2) Date filtering logic
   filterByDate() {
      const { startDate, endDate, timeFrame } = this.queryString

      let start, end
      const currentDate = new Date()

      if (timeFrame) {
         switch (timeFrame) {
            case 'year':
               start = new Date(currentDate.getFullYear(), 0, 1)
               end = new Date(currentDate.getFullYear() + 1, 0, 1)
               break
            case 'month':
               start = new Date(
                  currentDate.getFullYear(),
                  currentDate.getMonth(),
                  1
               )
               end = new Date(
                  currentDate.getFullYear(),
                  currentDate.getMonth() + 1,
                  1
               )
               break
            case 'week':
               const day = currentDate.getDay() || 7
               start = new Date(currentDate)
               start.setHours(0, 0, 0, 0)
               start.setDate(currentDate.getDate() - day + 1)
               end = new Date(start)
               end.setDate(start.getDate() + 6)
               end.setHours(23, 59, 59, 999)
               break
            default:
               throw new Error('Invalid time frame specified')
         }
      }

      if (startDate || endDate) {
         start = startDate ? new Date(startDate) : start
         end = endDate ? new Date(endDate) : end
      }

      if (start && end) {
         this.query = this.query.whereBetween('created_at', [start, end])
      }

      return this
   }

   // 3) Sort logic
   sort() {
      if (this.queryString.sort) {
         const sortBy = this.queryString.sort.split(',').map((field) => {
            return field.startsWith('-')
               ? { column: field.substring(1), order: 'desc' }
               : { column: field, order: 'asc' }
         })
         sortBy.forEach(({ column, order }) => {
            this.query = this.query.orderBy(column, order)
         })
      } else {
         this.query = this.query.orderBy('created_at', 'desc')
      }

      return this
   }

   // 4) Fields limiting logic (select specific fields)
   fieldsLimit() {
      if (this.queryString.fields) {
         const fields = this.queryString.fields
            .split(',')
            .map((field) => field.trim())
         this.query = this.query.select(fields)
      } else {
         this.query = this.query.select('*')
      }

      return this
   }

   // 5) Pagination logic
   paginate() {
      const page = this.queryString.page * 1 || 1
      const limit = this.queryString.limit * 1 || 100
      const offset = (page - 1) * limit

      this.query = this.query.limit(limit).offset(offset)

      return this
   }
}

export default APIFeatures

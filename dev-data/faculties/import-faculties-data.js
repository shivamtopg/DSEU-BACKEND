const mongoose = require('mongoose')
const connectDB = require('../../config/db.js')
const Faculty = require('../../models/Faculty')
const fs = require('fs')

// Connect to database
connectDB()

// Read and parse faculty data
const facultiesData = JSON.parse(
  fs.readFileSync(`${__dirname}/facultiesfinal5.json`, 'utf-8'),
)

// Normalize and convert data
const normalizedData = facultiesData.map((obj) => {
  // Create research array if any related field exists
  const hasResearchData =
    obj.research_area || obj.publications || obj.research_overview

  if (hasResearchData) {
    obj.research = [
      {
        research_area: obj.research_area || '',
        publications: obj.publications || '',
        research_overview: obj.research_overview || '',
      },
    ]
    delete obj.research_area
    delete obj.publications
    delete obj.research_overview
  }

  return obj
})

// Import data into the database
const importFaculties = async () => {
  try {
    await Faculty.insertMany(normalizedData)
    console.log('Faculty members inserted successfully!')
  } catch (err) {
    console.error('Error inserting faculty members:', err)
  } finally {
    mongoose.connection.close()
  }
}

if (process.argv[2] === 'import-faculties') {
  importFaculties()
}

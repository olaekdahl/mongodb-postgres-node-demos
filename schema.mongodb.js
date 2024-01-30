db.createCollection("students", {
    validator: {
       $jsonSchema: {
          bsonType: "object",
          title: "Student Object Validation",
          required: [ "address", "major", "name", "year" ],
          properties: {
             name: {
                bsonType: "string",
                description: "'name' must be a string and is required"
             },
             year: {
                bsonType: "int",
                minimum: 2017,
                maximum: 3017,
                description: "'year' must be an integer in [ 2017, 3017 ] and is required"
             },
             gpa: {
                bsonType: [ "double" ],
                description: "'gpa' must be a double if the field exists"
             }
          }
       }
    }
 } )

 db.students.insertOne( {
   name: "Alice",
   year: Int32( 2019 ),
   major: "History",
   gpa: Int32(3),
   address: {
      city: "NYC",
      street: "33rd Street"
   }
} )

db.students.insertOne( {
   name: "Alice",
   year: NumberInt(2019),
   major: "History",
   gpa: Double(3.0),
   address: {
      city: "NYC",
      street: "33rd Street"
   }
} )
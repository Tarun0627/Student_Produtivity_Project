
const responseService = require("../../utils/ResponseService/");
const messages = require("../../utils/messages");
const UserModel = require("./user.model");

/**
 * Controller class for user-related operations.
 */

class userController {
  /**
     * Constructor for the userController class.
     */
    constructor() {
        this.User = new UserModel();
    }

      /**
     * Fetches tasks based on the provided criteria.
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     */

    fetchTask = async (req, res, next) => {
        try {
            const { startDate, endDate } = req.body;
            const matchObj = {};
            // matchObj.hours = {
            //     $gte: new date(hours)
            // };
            matchObj.name = {
                $regex: new RegExp(req.body.name, 'i')

            };
            matchObj.date = {
                $gte: new Date(startDate),
                $lte: new Date(endDate + "T23:59:59.999Z"),
            };

            console.log("matchObj", matchObj);
            const task = await this.User.fetchTask(matchObj);
            res.send(task);
        } catch (error) {
            console.log("Error occurred while fetching task", error?.message);
            res.send(false);
        }
    };
    
      /**
     * Fetches productivity records based on the provided criteria.
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     */

    fetchProductivity = async (req, res ,next) => {
        
        try {
            // const { page = 1, limit = 3, sortField = 'date', sortOrder = 'asc' } = req.query;
            const page = req.body.page || 1
            const perPage = req.body.perPage || 3

            const aggregationPipeline = [
                { $match: {} }, 
                {
                    $group: {
                        _id: {
                            timeRanges:"$timeRanges",
                             student: "$student",
                            task: "$task"
                        },
                    },
                },
            
                {
                    $lookup: {
                        from: "students",
                        localField: "_id.student",
                        foreignField: "_id",
                        as: "studentInfo"
                    }
                },
                {
                    $lookup: {
                        from: "tasks",
                        localField: "_id.task",
                        foreignField: "_id",
                        as: "taskInfo"
                    }
                },  
                // this code for which fields you want to show in your output
                {
                    $project: {
                        "_id": {
                            "student": { $arrayElemAt: ["$studentInfo", 0] },
                             "task": "$_id.task",
                             "timeRanges": "$_id.timeRanges", 
                            //  "name": { $concat: ["$_id.student.firstName", " ", "$_id.student.lastName"] }

                        },
                    }
                },
                
                //this code for converting upper case to lower case
                {
                    $addFields: {
                        "lowercaseFirstName": { $toLower: "$_id.student.firstName" },
                         "_id.Name": { $concat: ["$_id.student.firstName", " ", "$_id.student.lastName"] }
                    }
                },
                {
                    $sort: { "lowercaseFirstName": 1 } 
                },
            
                {
                    $addFields: {
                        "lowercaseFirstName": { $toLower: "$_id.student.firstName" },
                        
                    }
                },
                // this code for removing feilds from the output
                // {
                //     $project: {
                //         "_id.student": 0,
                //         "lowercaseFirstName": 0,
                //         //  individual remove feilds from the _id.student
                //          // "_id.student.email": 0, 
                //         // "_id.student._id": 0,  
                //         // "_id.student.lastName": 0,
                //         // "_id.student.firstName": 0,   
                //     }
                // },
                // this code for sorting 
                {
                    $sort: { "lowercaseFirstName": 1 } 
                },
               
                { $skip: (page - 1) * perPage },
                { $limit: perPage }
               
            ];
           
            const Productivity = await this.User.fetchProductivity(aggregationPipeline);
            res.send(Productivity);

        } catch (error) {
            console.log("Error occurred while fetching productivity", error?.message);
            res.send(false);
        }
     };

 /**
     * Fetches tasks based on the provided criteria.
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     */
    fetchTasks = async (req, res, next) => {
        try {
           // const { startDate, endDate } = req.body;
            const page = req.body.page || 1
            const perPage = req.body.perPage || 3
            
            // const matchObj = {
            //     date: {
            //         $gte: new Date(startDate),
            //         $lte: new Date(endDate + "T23:59:59.999Z"),
            //     }
            // };

            const aggregationPipeline = [
                { $match: {} }, 
                {
                    $group: {
                        _id: {
                            
                            //  gmail:"$gmail",
                            name: "$name",
                            student: "$sutudent",
                        },
                        totalHour: { $sum: "$hours" },
                        
                    }
                },
                {
                    $lookup: {
                        from: "students",
                        localField: "_id.student",
                        foreignField: "_id",
                        as: "studentInfo"
                    }
                },
                {
                    $unwind: "$studentInfo"
                },
                {
                    $sort: { "_id.name": 1 } 
                },
                { $skip: (page - 1) * perPage },
                { $limit: perPage },
            ];
           

            // console.log("matchObj", matchObj);
            const tasks = await this.User.fetchTasks(aggregationPipeline);
            res.send(tasks);

        } catch (error) {
            console.log("Error occurred while fetching tasks", error?.message);
            res.send(false);
        }
    };

  /**
     * Fetches all details including tasks, productivity, and student list.
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     */

    fetchAllDetail = async (req, res, next) => {
    const studentListPromise = this.User.listStudents({});
    const tasksPromise = this.User.fetchTask({});
    const productivityPromise = this.User.fetchProductivity([{$match:{}}]);

    Promise.all([tasksPromise, productivityPromise, studentListPromise])
        .then(([tasks, productivity, studentList]) => {
            res.json({
                tasks,
                productivity,
                studentList
            });
        })
        .catch(error => {
            console.log("Error occurred while fetching all details:", error?.message);
            res.status(500).json({ error: error.message });
        });
};

}
module.exports = userController;

const { Student, TaskTbl, ProductivityTbl } = require('../../modals/index');


class UserModel {
  
   
    async fetchProductivity(whereClause) {
        return new Promise(async (resolve, reject) => {
            try {
                const Productivities = await ProductivityTbl.aggregate(whereClause)
                resolve(Productivities);
            } catch (err) {
                reject(err);
            }
        });

    }
    async fetchTasks(whereClause) {
        return new Promise(async (resolve, reject) => {
            try {
                // const tasks = await Tasks.aggregate([
                //     {
                //         $match: whereClause
                //     }
                // ])
                const tasks = await TaskTbl.aggregate(whereClause)
                resolve(tasks);
            } catch (err) {

                reject(err);
            }
        });

    }
    async fetchTask(whereClause) {
        return new Promise(async (resolve, reject) => {
            try {
                // const task = await TaskTbl.find(whereClause)
                const task = await TaskTbl.aggregate(
                    [ 
                    {
                        $match: whereClause
                    }
                   ]
                  )
                // .populate('sutudent')
                resolve(task);
            } catch (err) {

                reject(err);
            }
        });

    }

    async listStudents(whereClause) {
        return new Promise(async (resolve, reject) => {
            try {
                const StudentNote = await Student.find(whereClause);

                resolve(StudentNote);
            } catch (err) {

                reject(err);
            }
        });
    }
}
module.exports = UserModel;

import React from "react";

class TaskQueue extends React.Component{
    constructor(){
        super();
        this.state = {
            name : "selva",
        }
    }

    render(){
        return(
            <>
            <h1>{this.state.name}</h1>
            </>
        )
    }
}

export default TaskQueue

// import React from "react";

// function TaskQueue(){
//     return(
//         <>
//         <div>
//             <div>Heloo world</div>
//         </div>
//         </>
//     )
// }

// export default TaskQueue;

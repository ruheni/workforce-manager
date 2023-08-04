import Link from "next/link";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";

const deleteEmployee = async (employee:String) => {
  
    const api = `/api/employee/?employeeId=${employee}`;
  
    const res = await fetch(api, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const json = await res.json();
    return json;
  };
interface MainProps {
    employees: any;//{ name: string; code: string }[];
    setEmployees: (employee: any) => void;
    setView: (view: any) => void;
    setSelectedEmployee: (employee: any) => void;
    }

export default function Main({ employees,setEmployees, setView, setSelectedEmployee }: MainProps){ 

    async function handleDelete(employee:any){
        // setView('delete');
        console.log(employee);
        const isConfirm:Boolean = confirm("Are you sure you want to delete this employee?");
        try{
           console.log(isConfirm);
           if (isConfirm){
               await deleteEmployee(employee.id);
               console.log("deleted");
 
               const newEmployees = employees.filter((empl:any) => empl.id !== employee.id);
               setEmployees(newEmployees);
 
 
           }
         }catch(err){
             console.log(err);
         }
 
     }

    function handleEdit (employee:any)  {
        setSelectedEmployee(employee);  
        console.log(employee);
        setView('edit');
    }

    function handleClick (e:any)  {
        setView('view'); 
    }

    function handleAdd (e:any)  {
        setView('add');
    }

    
    return(
       <div className="flex-col">
                <div className="border p-4 mb-4 flex justify-between">
                    <Link href='/admin' className="bg-blue-500 text-white px-4 py-2 rounded">Back</Link>
                    <button onClick={handleAdd}className="bg-green-500 text-white px-4 py-2 rounded">Add New</button>
                </div>
                <div className="border p-4 flex space-x-3 font-bold">
                <h2 style={{ width: "20%" }}>Name</h2>
                <h3 style={{ width: "10%" }}>Code</h3>
                <h3 style={{ width: "20%" }}>Dept</h3>
                <h3 style={{ width: "10%" }}>Clocked In</h3>
                </div>

                {employees.map((employee:any) => (
                <div key={employee.id} className="border p-4 flex space-x-3 items-center">
                    <h2 style={{ width: "20%" }}>
                    {employee.name}
                    </h2>
                    <h3 style={{ width: "10%" }}>{employee.code}</h3>
                    <p style={{ width: "20%" }}>{employee.department.name}</p>
                    <p style={{ width: "10%" }}>{employee.isClockedIn ? "Yes" : "No"}</p>
                    <div className="flex space-x-2" style={{ width: "20%" }}>
                    <button onClick={()=>handleEdit(employee)} className="bg-green-500 text-white px-2 py-1 rounded">
                        <FaEdit />
                    </button> 
                    <button onClick={()=>handleDelete(employee)} className="bg-red-500 text-white px-2 py-1 rounded">
                        <FaTrash />
                    </button>
                  
                    </div>
                </div>
                ))}
            </div>
    )
}
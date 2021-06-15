import React, {Component}from 'react';
import {render} from 'react-dom';

class App extends Component{

    constructor(){
        super();
        this.state = {
            title:'',
            description: '',
            price:'',
            tasks:[],
            _id: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.addTask = this.addTask.bind(this);
    }

    addTask(e){
        if (this.state._id){
            fetch(`/api/tasks/${this.state._id}`,{
                method: 'PUT',
                body: JSON.stringify(this.state),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type' : 'application/json'
                }
            })
            .then(res=>res.json())
            .then(data=>{
                console.log(data);
                M.toast({html: 'Producto Actualizado'});
                this.setState({title:'', description: '', price:'', _id:''});
                this.fetchTasks();
            });
        }else{
            fetch('/api/tasks',{
                method: 'POST',
                body: JSON.stringify(this.state),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type' : 'application/json'
                }
            })
                .then(res=> res.json())
                .then(data=>{
                    console.log(data)
                    M.toast({html: 'Producto Guardado'})
                    this.setState({title:'', description: '', price:''});
                    this.fetchTasks();
                })
                .catch(err=> console.log(err));
        }
        e.preventDefault();
    }

    componentDidMount(){
        this.fetchTasks();
    }    
    fetchTasks(){
        fetch('/api/tasks')
            .then(res=>res.json())
            .then(data=>{
                this.setState({tasks: data})
                console.log(this.state.tasks)
            });
    }

    deleteTask(id){
        if(confirm('Seguro que quiere eliminar el elemento')){
            fetch(`/api/tasks/${id}`,{
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type' : 'application/json'
                }  
            })
            .then(res=>res.json())
            .then(data=>{
                console.log(data);
                M.toast({html: 'Producto Eliminado'});
                this.fetchTasks();
            });
        }
    }

    editTask(id){
        fetch(`/api/tasks/${id}`)
            .then(res=>res.json())
            .then(data=>{
                console.log(data)
                this.setState({
                    title: data.title,
                    description: data.description,
                    price: data.price,
                    _id: data._id
                })
            });
    }

    handleChange(e){
        const {name,value} = e.target;
        this.setState({
            [name]:value
        })
    }


    render(){
        return(
            <div>
                {/*NAVIGATION*/}
                <nav className="black darken-4">
                    <div className="container">
                        <a className="bran-logo" href="/">MOONLIGHT</a>
                    </div>
                </nav>
                <hr></hr>
                <div className="container">
                    <div className="row">
                        <div className="col s5">
                            <div className="card">
                                <div className="card-content">
                                    <form onSubmit={this.addTask}>

                                        <div className="row">
                                            <div className="input-field col s12">
                                                <input name="title" onChange={this.handleChange} type="text" placeholder="Nombre Producto" value={this.state.title} />
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="input-field col s12">
                                                <textarea name="description" onChange={this.handleChange} className="materialize-textarea" placeholder="Descripción Producto" value={this.state.description}/>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="input-field col s12">
                                                <input name="price" onChange={this.handleChange} type="text" placeholder="Precio Producto" value={this.state.price}/>
                                            </div>
                                        </div>
                                        <button className="btn black darken-4">
                                            Enviar
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="col s7">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Nombre</th>
                                        <th>Descripción</th>
                                        <th>Precio</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.tasks.map(task=>{
                                            return(
                                                <tr key={task._id}>
                                                    <td>{task.title}</td>
                                                    <td>{task.description}</td>
                                                    <td>{task.price}</td>
                                                    <td>
                                                        <button className="btn black darken-4"><i className="material-icons" onClick={()=>this.editTask(task._id)}>edit</i></button>
                                                        <button className="btn black darken-4" style={{margin:'4px'}} onClick={()=>this.deleteTask(task._id)}><i className="material-icons">delete</i></button>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

export default App;
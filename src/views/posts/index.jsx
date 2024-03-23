//import useState dan useEffect
import { useState, useEffect } from 'react';

//import api
import api from '../../api';

//import Link
import { Link } from 'react-router-dom';

export default function PostIndex() {

    //ini state
    const [posts, setPosts] = useState([]);

    //define method
    const fetchDataPosts = async () => {
    try {
        const response = await api.get('/api/posts');
        if (response.data && response.data.data) {
            // Log the response data for debugging
            console.log("Response data:", response.data.data);
            // Set posts state
            setPosts(response.data.data);
        } else {
            console.error("Invalid response format:", response.data);
        }
    } catch (error) {
        console.error("Error fetching posts:", error);
    }
}


    //run hook useEffect
    useEffect(() => {
        
        //call method "fetchDataPosts"
        fetchDataPosts();

    }, []);

    return (
        <div className="container mt-5 mb-5">
            <div className="row">
                <div className="col-md-12">
                    <Link to="/posts/create" className="btn btn-md btn-success rounded shadow border-0 mb-3">ADD NEW POST</Link>
                    <div className="card border-0 rounded shadow">
                        <div className="card-body">
                            <table className="table table-bordered">
                                <thead className="bg-dark text-white">
                                    <tr>
                                        <th scope="col">Image</th>
                                        <th scope="col">Title</th>
                                        <th scope="col">Content</th>
                                        <th scope="col" style={{ 'width': '15%' }}>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        posts.length > 0
                                            ?   posts.map((post, index) => (
                                                    <tr key={ index }>
                                                        <td className='text-center'>
                                                            <img src={post.image} alt={post.title} width="200" className='rounded' />
                                                        </td>
                                                        <td>{ post.title }</td>
                                                        <td>{ post.content }</td>
                                                        <td className="text-center">
                                                            <Link to={`/posts/edit/${post.id}`} className="btn btn-sm btn-primary rounded-sm shadow border-0 me-2">EDIT</Link>
                                                            <button className="btn btn-sm btn-danger rounded-sm shadow border-0">DELETE</button>
                                                        </td>
                                                    </tr>
                                                ))

                                            :   <tr>
                                                    <td colSpan="4" className="text-center">
                                                        <div className="alert alert-danger mb-0">
                                                            Data Belum Tersedia!
                                                        </div>
                                                    </td>
                                                </tr>
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
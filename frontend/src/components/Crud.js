import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {
  Container,
  Grid,
  TextField,
  Button,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  IconButton,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import Navbar from './NavBar';
import { fetchProducts } from '../actions/ProductActions';

const Crud = () => {
  const [files, setFiles] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [sortBy, setSortBy] = useState('name'); // Default sort by name
  const [sortOrder, setSortOrder] = useState('asc'); // Default sort order ascending
  const [searchTerm, setSearchTerm] = useState(''); // State for search term
  const [productsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const dispatch = useDispatch();
  const { loading, products, error } = useSelector(state => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]); // Fetch products when component mounts

  const handleSortChange = (e) => {
    const { value } = e.target;
    const [newSortBy, newSortOrder] = value.split('-');
    setSortBy(newSortBy);
    setSortOrder(newSortOrder);
    // Optionally, you can dispatch fetchProducts() here to refetch sorted data
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFileChange = (e) => {
    setFiles(e.target.files[0]);
    setSelectedImage(URL.createObjectURL(e.target.files[0]));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!files) {
      alert('Please select a file');
      return;
    }

    const formData = new FormData();
    const form = event.target;
    const name = form.name.value;
    const stock = form.stock.value;

    formData.append('name', name);
    formData.append('stock', stock);
    formData.append('imageUrl', files);

    try {
      const response = await axios.post('http://localhost:5000/products', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.status === 201) {
        alert('Product uploaded successfully');
        form.reset();
        setFiles(null);
        setSelectedImage(null);
        dispatch(fetchProducts()); // Refresh data after successful upload
      } else {
        throw new Error('Upload failed');
      }
    } catch (error) {
      console.error('Error uploading product:', error);
      alert('Upload failed. Please check console for details.');
    }
  };

  const deleteItem = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5000/products/${id}`);
      console.log(response.data);
      alert('Product deleted successfully');
      dispatch(fetchProducts()); // Refresh data after successful delete
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Delete failed. Please check console for details.');
    }
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Logic to get current products
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <Navbar />
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          {/* Product Management Section */}
          <Grid item xs={12} md={6}>
            <Typography variant="h4" gutterBottom>Product Management</Typography>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Name"
                    name="name"
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <input
                    accept=".png, .jpg, .jpeg"
                    id="imageUrl"
                    name="imageUrl"
                    type="file"
                    style={{ display: 'none' }}
                    onChange={handleFileChange}
                  />
                  <label htmlFor="imageUrl">
                    <Button variant="outlined" component="span">
                      Upload Image
                    </Button>
                  </label>
                  {selectedImage && <img src={selectedImage} alt="Selected" style={{ maxWidth: '200px', maxHeight: '200px', marginLeft: '10px' }} />}
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Stock"
                    name="stock"
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button variant="contained" color="primary" type="submit">Submit</Button>
                </Grid>
              </Grid>
            </form>
          </Grid>

          {/* Product List Section */}
          <Grid item xs={12} md={6}>
            <Typography variant="h4" gutterBottom>Product List</Typography>
            <FormControl fullWidth>
              <InputLabel>Sort By</InputLabel>
              <Select value={`${sortBy}-${sortOrder}`} onChange={handleSortChange}>
                <MenuItem value="name-asc">Name (A-Z)</MenuItem>
                <MenuItem value="name-desc">Name (Z-A)</MenuItem>
                <MenuItem value="stock-asc">Stock (Low to High)</MenuItem>
                <MenuItem value="stock-desc">Stock (High to Low)</MenuItem>
              </Select>
            </FormControl>
            <TextField
              fullWidth
              label="Search by Name"
              variant="outlined"
              value={searchTerm}
              onChange={handleSearch}
              style={{ marginTop: '10px' }}
            />
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Image</TableCell>
                  <TableCell>Stock</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={4} align="center">Loading...</TableCell>
                  </TableRow>
                ) : error ? (
                  <TableRow>
                    <TableCell colSpan={4} align="center">Error: {error}</TableCell>
                  </TableRow>
                ) : filteredProducts.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} align="center">No products found</TableCell>
                  </TableRow>
                ) : (
                  filteredProducts.map(product => (
                    <TableRow key={product._id}>
                      <TableCell>{product.name}</TableCell>
                      <TableCell><img src={`http://localhost:5000/${product.imageUrl}`} alt="Product" style={{ width: '50px', height: '50px' }} /></TableCell>
                      <TableCell>{product.stock}</TableCell>
                      <TableCell>
                        <Link to={`/edit/${product._id}`}>
                          <Button variant="outlined" color="primary">Edit</Button>
                        </Link>
                        <IconButton color="secondary" onClick={() => deleteItem(product._id)}>
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
            <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => paginate(currentPage + 1)}
            style={{ marginLeft: '10px' }}
            disabled={currentProducts.length < productsPerPage}
          >
            Next
          </Button>
        </div>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Crud;








// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';
// import {
//     Container,
//     Grid,
//     TextField,
//     Button,
//     Table,
//     TableHead,
//     TableBody,
//     TableRow,
//     TableCell,
//     IconButton,
//     Typography,
//     FormControl,
//     InputLabel,
//     Select,
//     MenuItem
// } from '@mui/material';
// import DeleteIcon from '@mui/icons-material/Delete';
// import Navbar from './NavBar';

// const Crud = () => {
//     const [files, setFiles] = useState(null);
//     const [datas, setDatas] = useState([]);
//     const [selectedImage, setSelectedImage] = useState(null);
//     const [sortBy, setSortBy] = useState('name'); // Default sort by name
//     const [sortOrder, setSortOrder] = useState('asc'); // Default sort order ascending
//     const [searchTerm, setSearchTerm] = useState(''); // State for search term

//     useEffect(() => {
//         fetchData();
//     }, [sortBy, sortOrder]); // Update data when sortBy or sortOrder changes

//     const fetchData = async () => {
//         try {
//             const response = await axios.get(`http://localhost:5000/products?sortBy=${sortBy}&sortOrder=${sortOrder}`);
//             setDatas(response.data); // Update datas state with fetched data
//         } catch (error) {
//             console.error('Error fetching data:', error);
//         }
//     };

//     const handleSortChange = (e) => {
//         const { value } = e.target;
//         const [newSortBy, newSortOrder] = value.split('-');
//         setSortBy(newSortBy);
//         setSortOrder(newSortOrder);
//     };

//     const handleSearch = (e) => {
//         setSearchTerm(e.target.value);
//     };

//     const handleFileChange = (e) => {
//         setFiles(e.target.files[0]);
//         setSelectedImage(URL.createObjectURL(e.target.files[0]));
//     };

//     const handleSubmit = async (event) => {
//         event.preventDefault();

//         if (!files) {
//             alert('Please select a file');
//             return;
//         }

//         const formData = new FormData();
//         const form = event.target;
//         const name = form.name.value;
//         const stock = form.stock.value;

//         formData.append('name', name);
//         formData.append('stock', stock);
//         formData.append('imageUrl', files);

//         try {
//             const response = await axios.post('http://localhost:5000/products', formData, {
//                 headers: {
//                     'Content-Type': 'multipart/form-data'
//                 }
//             });

//             if (response.status === 201) {
//                 alert('Product uploaded successfully');
//                 form.reset();
//                 setFiles(null);
//                 setSelectedImage(null);
//                 fetchData(); // Refresh data after successful upload
//             } else {
//                 throw new Error('Upload failed');
//             }
//         } catch (error) {
//             console.error('Error uploading product:', error);
//             alert('Upload failed. Please check console for details.');
//         }
//     };

//     const deleteItem = async (id) => {
//         try {
//             const response = await axios.delete(`http://localhost:5000/products/${id}`);
//             console.log(response.data);
//             alert('Product deleted successfully');
//             fetchData(); // Refresh data after successful delete
//         } catch (error) {
//             console.error('Error deleting product:', error);
//             alert('Delete failed. Please check console for details.');
//         }
//     };

//     const filteredDatas = datas.filter(data =>
//         data.name.toLowerCase().includes(searchTerm.toLowerCase())
//     );

//     return (
//         <div>
//  <Navbar/>
//  <Container maxWidth="lg">
//             <Grid container spacing={3}>
//                 {/* Product Management Section */}
//                 <Grid item xs={12} md={6}>
//                     <Typography variant="h4" gutterBottom>Product Management</Typography>
//                     <form onSubmit={handleSubmit}>
//                         <Grid container spacing={2}>
//                             <Grid item xs={12}>
//                                 <TextField
//                                     fullWidth
//                                     label="Name"
//                                     name="name"
//                                     required
//                                 />
//                             </Grid>
//                             <Grid item xs={12}>
//                                 <input
//                                     accept=".png, .jpg, .jpeg"
//                                     id="imageUrl"
//                                     name="imageUrl"
//                                     type="file"
//                                     style={{ display: 'none' }}
//                                     onChange={handleFileChange}
//                                 />
//                                 <label htmlFor="imageUrl">
//                                     <Button variant="outlined" component="span">
//                                         Upload Image
//                                     </Button>
//                                 </label>
//                                 {selectedImage && <img src={selectedImage} alt="Selected" style={{ maxWidth: '200px', maxHeight: '200px', marginLeft: '10px' }} />}
//                             </Grid>
//                             <Grid item xs={12}>
//                                 <TextField
//                                     fullWidth
//                                     label="Stock"
//                                     name="stock"
//                                     required
//                                 />
//                             </Grid>
//                             <Grid item xs={12}>
//                                 <Button variant="contained" color="primary" type="submit">Submit</Button>
//                             </Grid>
//                         </Grid>
//                     </form>
//                 </Grid>

//                 {/* Product List Section */}
//                 <Grid item xs={12} md={6}>
//                     <Typography variant="h4" gutterBottom>Product List</Typography>
//                     <FormControl fullWidth>
//                         <InputLabel>Sort By</InputLabel>
//                         <Select value={`${sortBy}-${sortOrder}`} onChange={handleSortChange}>
//                             <MenuItem value="name-asc">Name (A-Z)</MenuItem>
//                             <MenuItem value="name-desc">Name (Z-A)</MenuItem>
//                             <MenuItem value="stock-asc">Stock (Low to High)</MenuItem>
//                             <MenuItem value="stock-desc">Stock (High to Low)</MenuItem>
//                         </Select>
//                     </FormControl>
//                     <TextField
//                         fullWidth
//                         label="Search by Name"
//                         variant="outlined"
//                         value={searchTerm}
//                         onChange={handleSearch}
//                         style={{ marginTop: '10px' }}
//                     />
//                     <Table>
//                         <TableHead>
//                             <TableRow>
//                                 <TableCell>Name</TableCell>
//                                 <TableCell>Image</TableCell>
//                                 <TableCell>Stock</TableCell>
//                                 <TableCell>Action</TableCell>
//                             </TableRow>
//                         </TableHead>
//                         <TableBody>
//                             {filteredDatas.map(data => (
//                                 <TableRow key={data._id}>
//                                     <TableCell>{data.name}</TableCell>
//                                     <TableCell><img src={`http://localhost:5000/${data.imageUrl}`} alt="Product" style={{ width: '50px', height: '50px' }} /></TableCell>
//                                     <TableCell>{data.stock}</TableCell>
//                                     <TableCell>
//                                         <Link to={`/edit/${data._id}`}>
//                                             <Button variant="outlined" color="primary">Edit</Button>
//                                         </Link>
//                                         <IconButton color="secondary" onClick={() => deleteItem(data._id)}>
//                                             <DeleteIcon />
//                                         </IconButton>
//                                     </TableCell>
//                                 </TableRow>
//                             ))}
//                         </TableBody>
//                     </Table>
//                 </Grid>
//             </Grid>
//         </Container>
//         </div>
       
      
//     );
// };

// export default Crud;

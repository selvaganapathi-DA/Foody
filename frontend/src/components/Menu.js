import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const Menu = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:5000/products'); // Replace with your API endpoint
                setProducts(response.data); // Assuming response.data is an array of products
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
        fetchProducts();
    }, []);

    return (
        <div>
 <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                    <TableCell>Name</TableCell>
                        <TableCell>Image</TableCell>
                        <TableCell>Stock</TableCell>
                        {/* Add more columns as needed */}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {products.map((product) => (
                        <TableRow key={product.id}>
                            <TableCell>{product.name}</TableCell>
                            <TableCell>
                            {product.imageUrl}</TableCell>
                            <TableCell>{product.stock}</TableCell>

                            {/* Render other product attributes as needed */}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
        </div>
       
    );
};

export default Menu;

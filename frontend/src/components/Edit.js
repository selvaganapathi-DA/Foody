import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { TextField, Button, Container, Stack } from '@mui/material';

const Edit = () => {
    const { id } = useParams();
    const [productData, setProductData] = useState({
        name: "",
        imageUrl: "",
        stock: ""
    });

    useEffect(() => {
        fetch(`http://localhost:5000/products/${id}`)
            .then(res => res.json())
            .then(data => setProductData(data))
            .catch(error => console.error('Error fetching product:', error));
    }, [id]); // <-- Add id as a dependency

    const handleUpdate = (event) => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const stock = form.stock.value;

        const formData = new FormData();
        formData.append('name', name);
        formData.append('stock', stock);
        formData.append('image', form.image.files[0]); // Handle file upload

        fetch(`http://localhost:5000/products/${id}`, {
            method: 'PUT',
            body: formData
        })
        .then(res => res.json())
        .then(data => {
            alert("Product updated successfully");
            // Optionally redirect or update state after successful update
        })
        .catch(error => console.error('Error updating product:', error));
    };

    return (
        <Container maxWidth="sm">
            <div style={{ textAlign: 'center' }}>
                <h2>Edit Product</h2>
                <form onSubmit={handleUpdate} className='uploadform'>
                    <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
                        <TextField
                            type="text"
                            variant='outlined'
                            color='secondary'
                            label="Name"
                            value={productData.name}
                            fullWidth
                            required
                            onChange={(e) => setProductData({ ...productData, name: e.target.value })}
                        />
                            
                        <br/>
                        <TextField
                            type="text"
                            variant='outlined'
                            color='secondary'
                            label="Stock"
                            value={productData.stock}
                            fullWidth
                            required
                            onChange={(e) => setProductData({ ...productData, stock: e.target.value })}
                        />
                    </Stack>

                    <input
                        type="file"
                        id="image"
                        name="image"
                        accept="image/*"
                        style={{ display: 'none' }}
                        onChange={(e) => setProductData({ ...productData, imageUrl: URL.createObjectURL(e.target.files[0]) })}
                    />
                    <label htmlFor="image">
                        <Button variant="outlined" color="secondary" component="span">
                            Upload Image
                        </Button>
                    </label>

                    <Button variant="outlined" color="secondary" type="submit">Submit</Button>
                </form>
            </div>
        </Container>
    );
};

export default Edit;

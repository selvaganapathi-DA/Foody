// import React, { useContext, useState } from 'react';
// import { Table, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
// import { UserContext } from './UserContext';
// import 'bootstrap/dist/css/bootstrap.min.css';

// function Fetchfile() {
//   const { users, createUser } = useContext(UserContext);
//   const [username, setUsername] = useState('');
//   const [email, setEmail] = useState('');
//   const [phone, setPhone] = useState('');
//   const [address, setAddress] = useState('');
//   const [city, setCity] = useState('');
//   const [state, setState] = useState('');
//   const [country, setCountry] = useState('');
//   const [zip, setZip] = useState('');
//   const [gender, setGender] = useState('');
//   const [modalOpen, setModalOpen] = useState(false);

//   const toggleModal = () => setModalOpen(!modalOpen);

//   const handleCreateUser = () => {
//     const userData = {
//       name: username,
//       email,
//       phone,
//       address,
//       city,
//       state,
//       country,
//       zip,
//       gender,
//     };

//     if (!username || !email || !phone || !address || !city || !state || !country || !zip || !gender) {
//       alert('Please enter all fields.');
//       return;
//     }

//     createUser(userData);

//     setUsername('');
//     setEmail('');
//     setPhone('');
//     setAddress('');
//     setCity('');
//     setState('');
//     setCountry('');
//     setZip('');
//     setGender('');
//     toggleModal();
//   };

//   return (
//     <div>
//       <Table>
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Name</th>
//             <th>Email</th>
//             <th>Phone</th>
//             <th>Address</th>
//             <th>City</th>
//             <th>State</th>
//             <th>Country</th>
//             <th>ZIP</th>
//             <th>Gender</th>
//           </tr>
//         </thead>
//         <tbody>
//           {users.map(user => (
//             <tr key={user.id}>
//               <td>{user.id}</td>
//               <td>{user.name}</td>
//               <td>{user.email}</td>
//               <td>{user.phone}</td>
//               <td>{user.address}</td>
//               <td>{user.city}</td>
//               <td>{user.state}</td>
//               <td>{user.country}</td>
//               <td>{user.zip}</td>
//               <td>{user.gender}</td>
//             </tr>
//           ))}
//         </tbody>
//       </Table>

//       <Button onClick={toggleModal}>Add User</Button>

//       <Modal isOpen={modalOpen} toggle={toggleModal}>
//         <ModalHeader toggle={toggleModal}>Add User</ModalHeader>
//         <ModalBody>
//           <input type='text' value={username} onChange={(e) => setUsername(e.target.value)} placeholder='Name' />
//           <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' />
//           <input type='text' value={phone} onChange={(e) => setPhone(e.target.value)} placeholder='Phone' />
//           <input type='text' value={address} onChange={(e) => setAddress(e.target.value)} placeholder='Address' />
//           <input type='text' value={city} onChange={(e) => setCity(e.target.value)} placeholder='City' />
//           <input type='text' value={state} onChange={(e) => setState(e.target.value)} placeholder='State' />
//           <input type='text' value={country} onChange={(e) => setCountry(e.target.value)} placeholder='Country' />
//           <input type='text' value={zip} onChange={(e) => setZip(e.target.value)} placeholder='ZIP' />
//           <select value={gender} onChange={(e) => setGender(e.target.value)}>
//             <option value="">Select Gender</option>
//             <option value="Male">Male</option>
//             <option value="Female">Female</option>
//           </select>
//         </ModalBody>
//         <ModalFooter>
//           <Button color="secondary" onClick={toggleModal}>Cancel</Button>
//           <Button color="primary" onClick={handleCreateUser}>Create</Button>
//         </ModalFooter>
//       </Modal>
//     </div>
//   );
// }

// export default Fetchfile;

import React, { useState } from 'react';
import useQueue from './useQueue';

const QueueExample = () => {
  const [results, setResults] = useState([]);
  const addTaskToQueue = useQueue();

  const addTask = () => {
    addTaskToQueue(() => new Promise((resolve) => {
      setTimeout(() => {
        setResults(prev => [...prev, `Task completed at ${new Date().toLocaleTimeString()}`]);
        resolve();
      }, 1000); // Simulate async task
    }));
  };

  return (
    <div>
      <button onClick={addTask}>Add Task to Queue</button>
      <ul>
        {results.map((result, index) => (
          <li key={index}>{result}</li>
        ))}
      </ul>
    </div>
  );
};

export default QueueExample;

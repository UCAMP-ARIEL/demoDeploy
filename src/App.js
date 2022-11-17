import './App.css'
import React, { useState, useEffect } from 'react'
import { db } from './firebase'
import { collection, getDocs, addDoc, onSnapshot, deleteDoc, doc } from 'firebase/firestore'

function App() {
	const [users, setUsers] = useState([])

	const nuevoUsuario = {
		nombre: 'Jorge',
		apellido: 'Guinzburg',
		edad: 45,
	}

	const getData = () => {
		onSnapshot(collection(db, 'usuarios'), (snapshot) => {
			setUsers(snapshot.docs.map((doc) => doc))
		})
	}
	// const getData = async () => {
	// 	const snapshot = await getDocs(collection(db, 'usuarios'))
	// 	setUsers(snapshot.docs.map((doc) => doc.data()))
	// }

	const addData = async (values) => {
		await addDoc(collection(db, 'usuarios'), values)
	}

	const deleteData = async (id) => {
		await deleteDoc(doc(db, 'usuarios', id))
	}

	useEffect(() => {
		getData()
	}, [])
	return (
		<>
			<button onClick={() => addData(nuevoUsuario)}>AGREGAR</button>
			{users &&
				users.map((user, index) => {
					const { nombre, apellido, edad } = user.data()

					return (
						<div style={{ border: '1px solid black' }} key={index}>
							<p>{`NOMBRES: ${nombre} ${apellido}`}</p>
							<p>Edad: {edad ? edad : 'Sin declarar'}</p>
							<p>{`ID: ${user.id} `}</p>
							<button onClick={() => deleteData(user.id)}>Borrar</button>
						</div>
					)
				})}
		</>
	)
}

export default App

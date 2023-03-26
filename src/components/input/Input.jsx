import axios from "axios";
import React, { useEffect, useState } from "react";

const Input = () => {
	//State Mangement for input value=================

	const [input, setInput] = useState({
		name: "",
		email: "",
		cell: "",
		photo: "",
	});
	const { name, email, cell, photo } = input;

	//alert management===================================
	const [alert, setAlert] = useState({
		massage: "all fields are required",
		type: "danger",
		status: false,
	});
	const { massage, type, status } = alert;
	//alert dismiss========================================
	const alertDismiss = (e) => {
		e.preventDefault();
		setAlert({
			massage: "",
			type: "danger",
			status: false,
		});
	};

	//Submit Form by handleFormSubmit function=============
	const handleFormSubmit = (e) => {
		e.preventDefault();
		//form data validation=============================
		if (name === "" || email === "" || cell === "") {
			setAlert({
				massage: "all fields are required",
				type: "danger",
				status: true,
			});
		} else {
			axios
				.post("http://localhost:5050/developer", input)
				.then((response) => {
					setAlert({
						massage: "Form Submitted",
						type: "success",
						status: true,
					});
					//form data value reset =========================
					setInput({
						name: "",
						email: "",
						cell: "",
						photo: "",
					});
				})
				.catch((error) => {
					console.log(error);
				});
		}
	};

	//get all developer data by state and useeffect hook
	const [users, setUsers] = useState([]);
	useEffect(() => {
		axios
			.get("http://localhost:5050/developer")
			.then((res) => {
				setUsers(res.data);
			})
			.catch((error) => {
				console.log(error);
			});
	}, [users]);

	//delete data

	const handleDelete = (id) => {
		axios.delete(`http://localhost:5050/developer/${id}`);
	};
	return (
		<>
			<div className="container">
				<div className="row my-5">
					<div className="col-md-4">
						<div className="card">
							<div className="card-header">
								<h4 className="card-title">Add New User</h4>
							</div>
							<div className="card-body">
								{status && (
									<p p className={`alert alert-${type} d-flex justify-content-between`}>
										{massage} <button onClick={alertDismiss} className="btn-close"></button>
									</p>
								)}

								<form action="" onSubmit={handleFormSubmit} className="user-add-form">
									<div className="form-group">
										<label htmlFor="name">Name</label>
										<input
											className="form-control"
											type="text"
											name="name"
											id="name"
											value={name}
											onChange={(e) => setInput({ ...input, name: e.target.value })}
										/>
									</div>
									<div className="form-group">
										<label htmlFor="email">Email</label>
										<input
											className="form-control"
											type="text"
											name="email"
											id="email"
											value={email}
											onChange={(e) => setInput({ ...input, email: e.target.value })}
										/>
									</div>
									<div className="form-group">
										<label htmlFor="cell">Cell</label>
										<input
											className="form-control"
											type="text"
											name="cell"
											id="cell"
											value={cell}
											onChange={(e) => setInput({ ...input, cell: e.target.value })}
										/>
									</div>
									<div className="form-group">
										<label htmlFor="photo">Photo</label>
										<input
											className="form-control"
											type="text"
											name="photo"
											id="photo"
											value={photo}
											onChange={(e) => setInput({ ...input, photo: e.target.value })}
										/>
									</div>
									<input className="btn btn-outline-primary rounded my-4" type="submit" value="Add Now" />
								</form>
							</div>
						</div>
					</div>
					<div className="col-md-8">
						<div className="card">
							<div className="card-header">
								<h4 className="card-title">All User</h4>
							</div>
							<div className="card-body">
								<table className="table table-striped">
									<thead className="thead">
										<tr>
											<th>Serial</th>
											<th>Name</th>
											<th>Email</th>
											<th>cell</th>
											<th>Photo</th>
											<th>Action</th>
										</tr>
									</thead>
									<tbody className="tbody">
										{users.reverse().map((data, index) => (
											<tr>
												<td>{index + 1}</td>
												<td>{data.name}</td>
												<td>{data.email}</td>
												<td>{data.cell}</td>
												<td>
													<img
														style={{ width: "50px", height: "50px", objectFit: "cover" }}
														src={data.photo}
														alt="user"
													/>
												</td>
												<td colSpan={3}>
													<button className="btn btn-outline-danger btn-sm" onClick={() => handleDelete(data.id)}>
														Delete
													</button>
													<button className="btn btn-outline-info btn-sm">Edit</button>
													<button className="btn btn-outline-success btn-sm">View</button>
												</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Input;

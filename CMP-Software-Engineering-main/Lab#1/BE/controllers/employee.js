const employee = [
  { id: '1', name: 'Mohamed Sayed' },
];

exports.getEmployees = async (req, res, next) => {
  res.status(200).json({ data: employee });
};

// TODO
exports.deleteEmployee = async (req, res, next) => {
  const { id } = req.params; 

  const index = employee.findIndex(emp => emp.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Employee not found" });
  }

  employee.splice(index, 1); 

  res.status(200).json({ message: "Employee deleted" });
};

// TODO
exports.createEmployee = async (req, res, next) => {
  const { id, name } = req.body; 

  if (!id || !name) {
    return res.status(400).json({ message: "ID and Name are required" });
  }

  if (employee.some(emp => emp.id === id)) {
    return res.status(400).json({ message: "ID already exists" });
  }

  const newEmployee = { id, name };
  employee.push(newEmployee);

  res.status(201).json({ message: "Employee created", data: newEmployee });
};
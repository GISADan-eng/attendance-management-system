const Employee = require('../models/Employee');

const addEmployee = async (req, res) => {
  try {
    const { employeeId, name, email, department, role } = req.body;

    if (!employeeId || !name) {
      return res.status(400).json({ message: 'employeeId and name are required' });
    }

    const exists = await Employee.findOne({ employeeId });
    if (exists) {
      return res.status(400).json({ message: 'Employee ID already exists' });
    }

    const employee = await Employee.create({
      employeeId,
      name,
      email,
      department,
      role,
      createdBy: req.user._id,
    });

    res.status(201).json(employee);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getEmployees = async (req, res) => {
  try {
    const { search, department } = req.query;
    const query = {};

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { employeeId: { $regex: search, $options: 'i' } },
      ];
    }
    if (department) query.department = department;

    const employees = await Employee.find(query).sort({ createdAt: -1 });
    res.json(employees);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) return res.status(404).json({ message: 'Employee not found' });
    res.json(employee);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!employee) return res.status(404).json({ message: 'Employee not found' });
    res.json(employee);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);
    if (!employee) return res.status(404).json({ message: 'Employee not found' });
    res.json({ message: 'Employee removed' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { addEmployee, getEmployees, getEmployeeById, updateEmployee, deleteEmployee };
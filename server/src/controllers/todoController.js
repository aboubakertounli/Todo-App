const prisma = require('../prismaClient');

exports.getTodos = async (req, res) => {
    try {
        const todos = await prisma.todo.findMany({
            where: { userId: req.user.id },
            orderBy: { createdAt: 'desc' },
        });
        res.json(todos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.createTodo = async (req, res) => {
    try {
        const { title } = req.body;
        const todo = await prisma.todo.create({
            data: {
                title,
                userId: req.user.id,
            },
        });
        res.status(201).json(todo);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.updateTodo = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, completed } = req.body;

        // Verify ownership
        const todo = await prisma.todo.findUnique({ where: { id: parseInt(id) } });
        if (!todo) return res.status(404).json({ message: 'Todo not found' });
        if (todo.userId !== req.user.id) return res.status(401).json({ message: 'Not authorized' });

        const updatedTodo = await prisma.todo.update({
            where: { id: parseInt(id) },
            data: { title, completed },
        });
        res.json(updatedTodo);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.deleteTodo = async (req, res) => {
    try {
        const { id } = req.params;

        // Verify ownership
        const todo = await prisma.todo.findUnique({ where: { id: parseInt(id) } });
        if (!todo) return res.status(404).json({ message: 'Todo not found' });
        if (todo.userId !== req.user.id) return res.status(401).json({ message: 'Not authorized' });

        await prisma.todo.delete({ where: { id: parseInt(id) } });
        res.json({ message: 'Todo deleted' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

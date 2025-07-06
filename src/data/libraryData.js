// Library data for the campus library system
export const libraryBooks = [
    {
        id: 1,
        title: "Introduction to Computer Science",
        author: "Dr. Sarah Johnson",
        coverImage: "https://images.unsplash.com/photo-1529158062015-cad636e205a0?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
        category: "Computer Science",
        publishYear: 2023,
        available: true,
        location: "Main Library Floor 2",
        description: "A comprehensive introduction to computer science principles, algorithms, and programming concepts.",
        isbn: "978-1234567890"
    },
    {
        id: 2,
        title: "Advanced Data Structures and Algorithms",
        author: "Prof. Michael Chen",
        coverImage: "https://images.unsplash.com/photo-1532012197267-da84d127e765?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
        category: "Computer Science",
        publishYear: 2022,
        available: true,
        location: "Main Library Floor 3",
        description: "In-depth exploration of advanced data structures and algorithmic techniques for efficient problem-solving.",
        isbn: "978-2345678901"
    },
    {
        id: 3,
        title: "Database Systems: The Complete Book",
        author: "Dr. Jennifer Garcia",
        coverImage: "https://images.unsplash.com/photo-1589998059171-988d887df646?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
        category: "Computer Science",
        publishYear: 2021,
        available: false,
        location: "Technology Library Floor 1",
        description: "Comprehensive coverage of database management systems, SQL, and data modeling techniques.",
        isbn: "978-3456789012"
    },
    {
        id: 4,
        title: "Calculus: Early Transcendentals",
        author: "Dr. Robert Taylor",
        coverImage: "https://images.unsplash.com/photo-1621351183012-e2f9972dd9bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
        category: "Mathematics",
        publishYear: 2020,
        available: true,
        location: "Science Library Floor 2",
        description: "Essential calculus concepts for science and engineering students, with practical applications.",
        isbn: "978-4567890123"
    },
    {
        id: 5,
        title: "Linear Algebra and Its Applications",
        author: "Prof. Emily Wilson",
        coverImage: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
        category: "Mathematics",
        publishYear: 2019,
        available: true,
        location: "Science Library Floor 2",
        description: "Fundamental concepts of linear algebra with applications in engineering and computer science.",
        isbn: "978-5678901234"
    },
    {
        id: 6,
        title: "Digital Logic Design",
        author: "Dr. Thomas Brown",
        coverImage: "https://images.unsplash.com/photo-1453906971074-ce568cccbc63?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
        category: "Electronics",
        publishYear: 2021,
        available: true,
        location: "Engineering Library Floor 1",
        description: "Introduction to digital systems, boolean algebra, combinational and sequential logic design.",
        isbn: "978-6789012345"
    },
    {
        id: 7,
        title: "Operating System Concepts",
        author: "Prof. David Miller",
        coverImage: "https://images.unsplash.com/photo-1602738328654-51ab2ae6c4ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
        category: "Computer Science",
        publishYear: 2022,
        available: false,
        location: "Main Library Floor 3",
        description: "In-depth exploration of operating system principles, processes, memory management, and file systems.",
        isbn: "978-7890123456"
    },
    {
        id: 8,
        title: "Computer Networks: A Systems Approach",
        author: "Dr. Linda Martinez",
        coverImage: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
        category: "Computer Science",
        publishYear: 2020,
        available: true,
        location: "Technology Library Floor 2",
        description: "Comprehensive guide to computer networking concepts, protocols, and architectures.",
        isbn: "978-8901234567"
    },
    {
        id: 9,
        title: "Introduction to Artificial Intelligence",
        author: "Prof. James Wilson",
        coverImage: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
        category: "Computer Science",
        publishYear: 2023,
        available: true,
        location: "Technology Library Floor 3",
        description: "Foundations of AI including search algorithms, knowledge representation, and machine learning.",
        isbn: "978-9012345678"
    },
    {
        id: 10,
        title: "Software Engineering: A Practitioner's Approach",
        author: "Dr. Olivia Thompson",
        coverImage: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
        category: "Computer Science",
        publishYear: 2022,
        available: false,
        location: "Main Library Floor 2",
        description: "Practical guide to software development methodologies, requirements engineering, and quality assurance.",
        isbn: "978-0123456789"
    },
    {
        id: 11,
        title: "Physics for Scientists and Engineers",
        author: "Prof. Richard Davis",
        coverImage: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
        category: "Physics",
        publishYear: 2020,
        available: true,
        location: "Science Library Floor 1",
        description: "Comprehensive physics textbook covering mechanics, electromagnetism, thermodynamics, and modern physics.",
        isbn: "978-1122334455"
    },
    {
        id: 12,
        title: "Cloud Computing: Concepts and Paradigms",
        author: "Dr. Sophia Patel",
        coverImage: "https://images.unsplash.com/photo-1573164574472-797cdf4a583a?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
        category: "Computer Science",
        publishYear: 2021,
        available: true,
        location: "Technology Library Floor 2",
        description: "Exploration of cloud computing technologies, service models, deployment strategies, and security considerations.",
        isbn: "978-2233445566"
    }
];

export const getBooksByCategory = (category) => {
    if (!category || category === 'All') {
        return libraryBooks;
    }
    return libraryBooks.filter(book => book.category === category);
};

export const getAvailableBooks = () => {
    return libraryBooks.filter(book => book.available);
};

export const searchBooks = (query) => {
    const lowerCaseQuery = query.toLowerCase();
    return libraryBooks.filter(book => 
        book.title.toLowerCase().includes(lowerCaseQuery) || 
        book.author.toLowerCase().includes(lowerCaseQuery) ||
        book.category.toLowerCase().includes(lowerCaseQuery) ||
        book.description.toLowerCase().includes(lowerCaseQuery)
    );
};

export const getBookCategories = () => {
    const categories = new Set(libraryBooks.map(book => book.category));
    return ['All', ...Array.from(categories)];
};

# Smart Table

A dynamic data table application with advanced features including sorting, filtering, pagination, and server-side data fetching.

## 🚀 Features

- **Dynamic Data Loading**: Fetches data from a remote API with intelligent caching
- **Advanced Filtering**: Filter by date, customer, seller, and total amount range
- **Multi-Column Sorting**: Sort data by date or total amount in ascending/descending order
- **Global Search**: Search across all data fields
- **Pagination**: Navigate through data with customizable rows per page (10, 25, 50, 100)
- **Responsive Design**: Clean and modern UI built with custom CSS
- **Template-Based Rendering**: Efficient DOM manipulation using HTML templates

## 🛠️ Technology Stack

- **Vanilla JavaScript** (ES6+ modules)
- **Vite** - Build tool and development server
- **HTML5 Templates** - For component rendering
- **CSS3** - Custom styling with CSS variables
- **YS Text Font** - Typography by Yandex

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/SofiaKubo/smart-table.git

# Navigate to project directory
cd smart-table

# Install dependencies
npm install
```

## 🚀 Usage

### Development Mode

```bash
npm run dev
```

This starts the Vite development server.  Open your browser and navigate to the provided local URL (typically `http://localhost:5173`).

### Build for Production

```bash
npm run build
```

This creates an optimized production build in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## 📁 Project Structure

```
smart-table/
├── src/
│   ├── components/       # UI components
│   │   ├── filtering.js  # Filter functionality
│   │   ├── pagination.js # Pagination controls
│   │   ├── searching.js  # Global search
│   │   ├── sorting.js    # Column sorting
│   │   └── table.js      # Main table component
│   ├── data/            # Dataset files
│   ├── fonts/           # Custom fonts (YS Text)
│   ├── lib/             # Utility functions
│   │   ├── sort.js      # Sort state management
│   │   └── utils.js     # Helper functions
│   ├── assets/          # Icons and images
│   ├── data.js          # API wrapper
│   ├── main.js          # Application entry point
│   └── style.css        # Main styles
├── public/              # Static assets
├── index.html           # HTML entry point
└── package.json         # Project configuration
```

## 🎯 Key Components

### Table Component
The main table component manages rendering and user interactions.  It uses HTML templates for efficient DOM updates.

### Filtering System
- **Text filters**:  Date and customer name
- **Dropdown filter**: Seller selection
- **Range filter**: Total amount (from/to)

### Sorting
Toggle between ascending, descending, and no sort for date and total columns.

### Pagination
- Configurable rows per page
- Page navigation (first, previous, next, last)
- Visual page number buttons
- Display counter showing current range

### Search
Global search across all data fields with real-time server-side filtering.

## 🔌 API Integration

The application connects to a remote API: 

```
Base URL: https://webinars.webdev.education-services.ru/sp7-api
```

**Endpoints:**
- `/sellers` - Fetch seller index
- `/customers` - Fetch customer index
- `/records` - Fetch sales records with query parameters

**Query Parameters:**
- `search` - Global search term
- `sort` - Format: `field:order` (e.g., `date:up`)
- `filter[field]` - Field-specific filters
- `page` - Page number
- `rowsPerPage` - Items per page

## 🎨 Customization

The project uses CSS variables for easy theming.  Modify values in `:root` in `src/style.css`:

```css
:root {
    --color-primary: #3F5AA4;
    --color-background: #f9fafb;
    --font-family: "YS Text", sans-serif;
    /* ... more variables */
}
```

## 📝 License

This project was created as part of a Yandex Praktikum course based on the [smart-table template](https://github.com/yandex-praktikum/smart-table).

## 👤 Author

**SofiaKubo**
- GitHub: [@SofiaKubo](https://github.com/SofiaKubo)

---

Built with ❤️ using Vanilla JavaScript and Vite
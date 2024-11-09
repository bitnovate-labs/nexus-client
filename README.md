#

# Application Folder Structure

```
connexus-project/
│
├── node_modules/
│
├── public/                           # Public files (ex: browser tab icon like vite.svg)
│
├── src/
│   |__ assets/                       # Static assets like images, fonts, etc.
│   │   └── images/
│   ├── components/
│   │   ├── Agent                     # ALL Agent menu related components
│   │   │   └── Modals                # Pop up Modal components for Agent menu
│   │   ├── Cards                     # All Cards components / Widget components here
│   │   ├── Forms                     # Reusable Forms
│   │   ├── Layout                    # Configure the Sidebar, Header and Body
│   │   │   ├── Header                # ALL Header-related components here
│   │   │   ├── DashboardLayout.jsx   # Layout for the Dashboard (Sidebar, Header, Body)
│   │   │   └── Sidebar.jsx           # Sidebar component
│   │   └── ThemeToggleButton.jsx     # Light / Dark Mode button component
│   │
│   ├── contexts/                     # Context & Theme
│   │   ├── AuthContext.jsx
│   │   └── ThemeContext.jsx
│   ├── pages/                        # Dashboard pages
│   │   ├── Agent.jsx
│   │   ├── Dashboard.jsx
│   │   └── Login.jsx
│   ├── App.css                       # CSS configuration for App.jsx
│   ├── App.jsx                       # Main component (entry point)
│   ├── index.css                     # Global CSS configuration
│   └── main.jsx                      # Application entry (rendering App)
│
├── .gitignore                        # Files to ignore in Git
├── package.json                      # Project metadata, dependencies, scripts
├── README.md                         # Project documentation
└── tailwind.config.js                # TailwindCSS configuration
                                            ├── Configure theme colors here:
                                                ├── blue: DEFAULT
                                                └── gray: DEFAULT

```

## Run the application locally:

```
npm run dev
```

## Login username and password

Username: admin

Password: password

## Overriding Ant Design Default Styling & Customization

- Use custom CSS classes - Create a custom className and code the styling in index.css
- If unsure about the class name of a particular element, use Inspect Tool to find the class name.

```
jsx
...
<Sider className="custom-sider">
    {/* Sider content goes here */}
</Sider>

---
index.css

.custom-sider .ant-menu-item {
  color: white;  /* Change the menu item color */
}

.custom-sider .ant-menu-item:hover {
  background-color: #abcdef;  /* Change the hover background color */
}

.custom-sider .ant-menu-item-selected {
  background-color: #567890;  /* Change the selected menu item color */
}
```

- Directly apply inline styling with 'style' class to change the default configuration.

```
Example:
<Sider
    style={{
        backgroundColor: '#123456',  // Set your desired color here
        color: 'white',  // Change text color if needed
    }}
>
```

## Ant Design Notes

- Layout - Grid - <Row> (row) component

* used to create a row container that can hold multiple <Col> (column) components
* gutter prop:
  sets the space (or margin) between columns and rows within a <Row>
  makes the layout more responsive, creating a balanced look with consistent spacing across different screen sizes.

- Ant Design's grid system divides a row into 24 columns, setting each Col to 12 will split the row evenly.
- To configure the width distribution of the Columns, use "span".

```
  <Row gutter={16}>
    {/* Main Column - fills most of the row */}
    <Col span={18}>
      <Card title="Main Content">
        <p>This column takes up most of the space.</p>
      </Card>
    </Col>

    {/* Side Column - fills less space */}
    <Col span={6}>
      <Card title="Sidebar">
        <p>This column takes up less space.</p>
      </Card>
    </Col>
  </Row>
```

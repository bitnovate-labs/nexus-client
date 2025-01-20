#

Testing

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
│   │
│   ├── layouts/                      # Configure the Sidebar, Header and Body
│   │   │   ├── Header                # ALL Header-related components here
│   │   │   ├── MainContent.jsx       # Main area for page-specific content - all Page components need to be wrapped
|   |   |   |                           with <MainContent> in App.jsx to include the Header and Sidebar
│   │   │   └── Sidebar.jsx           # Sidebar component
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

- Use the code boilerplate from PageBoilerplate.jsx (src/pages/PageBoilerplate.jsx) as the codebase template to build new pages
- Page titles are named inside App.jsx -> <MainContent title="..title.." />

## Run the application locally:

```
npm run dev
```

## Login username and password

Username: admin

Password: password

# Versioning - Semantic Versioning Format

Go to package.json to manually update 'version' before every push to Github or build

```
MAJOR.MINOR.PATCH
```

Major - For major or breaking changes
Minor - When NEW FEATURES are ADDED
Patch - For BUG FIXES or MINOR UPDATES (no changes in existing functionality)

## Project Layout

The Layout directory consists of:

- Header directory
- DashboardLayout.jsx
- Sidebar.jsx

Header directory - consists of ALL the components you see in the header. Header.jsx file is the main file to setup or edit the layout of the components in the header

DashboardLayout.jsx - the file that lays out the structure of Sidebar, Header and the main Content body.

- Inside this file, the <Content> component takes in the "children prop" which is where the files and data from the pages directory (/src/pages) are passed in to be displayed.

Sidebar.jsx - to add in new menu items, find the 'menuItems' Array object (or "Navigation Menu Items" comment) and create your new menu based on:

- key - the order of arrangement ("1" is positioned at the top, then "2", and so on...)
- label - Menu Title (Ex: Dashboard, Agent Portal,..)
- icon
- children - in Array format
- function (optional)

* to create a Submenu:

```
Example:

{
  key: "3",
  icon: <UserOutlined />,
  label: "Project",
  children: [
    {
      key: "sub1",
      icon: <UserOutlined />,
      label: "Project 1",
    },
  ],
},

```

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

1. Layout - Grid - "Row" component

- used to create a row container that can hold multiple "Col" components
- gutter prop:
  sets the space (or margin) between columns and rows within a "Row"
  making the layout more responsive, creating a balanced look with consistent spacing across different screen sizes.

2. Ant Design's grid system divides a row into 24 columns, setting each Col to 12 will split the row evenly.

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

3. Ant Design component styling:

- Some styling can be done inline withing the Ant Design component itself but in case this cannot be done, scroll to the bottom of the Ant Design component page, look for "Design Token" and search for the "Token Name" you intend to style. Then head to - App.jsx and search for <ConfigProvider> then make your changes there.

```
Example:

<ConfigProvider
  theme={{
    algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm,
    token: {
      colorPrimary: "#004DFF",
    },
    components: {
      Table: {
        headerBg: isDark ? "#191D23" : "#FFFFFF",
      },
    },
  }}

# The guide is provided at: Design Token > Component Token - How to use?
```

## Prop Naming Conventions

- isModalVisible, setIsModalVisible
- open, onClose

## ANT DESIGN

- onFinish prop (for Modal) -> triggers Save/Submit button when Enter is pressed

- Testing

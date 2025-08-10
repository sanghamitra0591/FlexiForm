# Dynamic Form Builder

A powerful, intuitive form builder application built with React, TypeScript, and Material-UI. Create, customize, and manage dynamic forms with advanced features like derived fields, comprehensive validations, and real-time preview capabilities.

## Deployed Link
- Frontend - https://flexi-form-gold.vercel.app/

## 🚀 Features

### Core Functionality
- **Dynamic Form Creation**: Build forms with 7 different field types
- **Real-time Preview**: See how your form behaves for end users
- **Form Management**: Save, view, and manage all your forms
- **Persistent Storage**: All data stored locally using localStorage

### Field Types Supported
- **Text Input**: Standard text fields with validation
- **Number Input**: Numeric fields with min/max constraints
- **Textarea**: Multi-line text input
- **Select Dropdown**: Single-choice dropdown menus
- **Radio Buttons**: Single-choice radio button groups
- **Checkboxes**: Multi-choice checkbox groups
- **Date Picker**: Date selection with validation

### Advanced Features
- **Derived Fields**: Auto-calculated fields based on other field values
- **Comprehensive Validations**: Required, length, email, password rules
- **Field Reordering**: Drag and drop functionality for field arrangement
- **Form Schema Management**: Complete form configuration persistence
- **Responsive Design**: Works seamlessly on desktop and mobile

## 🛠️ Tech Stack

- **Frontend**: React 18 with TypeScript
- **UI Framework**: Material-UI (MUI) v5
- **State Management**: Redux Toolkit
- **Storage**: localStorage for data persistence
- **Validation**: Custom validation engine with real-time feedback
- **Icons**: Material-UI Icons

## 📋 Prerequisites

- Node.js (version 14 or higher)
- npm or yarn package manager
- Modern web browser with localStorage support

## 🏃‍♂️ Getting Started

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd dynamic-form-builder
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open your browser and navigate to `http://localhost:3000`

### Available Scripts

- `npm start` - Runs the app in development mode
- `npm build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm run eject` - Ejects from Create React App (one-way operation)

## 🗺️ Application Routes

### `/create` - Form Builder
The main form creation interface where you can:
- Add new fields with drag-and-drop functionality
- Configure field properties (label, validation, default values)
- Set up derived fields with parent-child relationships
- Reorder fields using up/down arrows or drag handles
- Save forms with custom names

### `/preview` - Form Preview
Interactive preview mode that shows:
- Real-time form rendering as end users would see it
- Live validation feedback
- Derived field auto-calculations
- Complete user interaction simulation

### `/myforms` - Saved Forms
Form management dashboard displaying:
- List of all saved forms
- Creation dates and form metadata
- Quick access to preview any saved form
- Form deletion capabilities

## 🔧 Key Features Explained

### Dynamic Field Configuration
Each field type supports extensive customization:

**Basic Properties:**
- Label text
- Required/Optional toggle
- Default values
- Placeholder text

**Validation Rules:**
- Required field validation
- Minimum/Maximum length constraints
- Email format validation
- Custom password rules (8+ chars, must contain numbers)

### Derived Fields System
Advanced feature allowing fields to compute values automatically:

1. **Parent Field Selection**: Choose one or more fields as data sources
2. **Formula Definition**: Define calculation logic (e.g., age from birthdate)
3. **Auto-Update**: Values recalculate when parent fields change
4. **Real-time Preview**: See derived calculations in preview mode

**Example Use Cases:**
- Calculate age from date of birth
- Compute totals from multiple numeric fields
- Generate full names from first/last name fields
- Create conditional logic based on other field values

### Form Schema Structure
Forms are stored as JSON schemas containing:
```typescript
interface FormSchema {
  id: string;
  name: string;
  createdAt: string;
  fields: FormField[];
}

interface FormField {
  id: string;
  type: FieldType;
  label: string;
  required: boolean;
  defaultValue?: any;
  validationRules: ValidationRule[];
  isDerived?: boolean;
  derivationConfig?: DerivedFieldConfig;
  options?: string[]; // For select, radio, checkbox fields
}
```

## 🎨 Design Philosophy

### User Experience
- **Intuitive Interface**: Clean, modern design with clear visual hierarchy
- **Progressive Disclosure**: Advanced features revealed as needed
- **Immediate Feedback**: Real-time validation and preview updates
- **Accessibility**: ARIA labels and keyboard navigation support

### Color Scheme
- **Primary**: Modern blue (#1976d2) for main actions
- **Secondary**: Complementary purple (#9c27b0) for accents
- **Success**: Green (#2e7d32) for positive actions
- **Error**: Red (#d32f2f) for validation errors
- **Background**: Clean whites and light grays for readability

### Component Architecture
- **Atomic Design**: Small, reusable components
- **Separation of Concerns**: Business logic separated from presentation
- **Type Safety**: Comprehensive TypeScript interfaces
- **Error Boundaries**: Graceful error handling throughout

## 📁 Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── FieldEditor/     # Field configuration components
│   ├── FormPreview/     # Form preview components
│   └── Common/          # Shared components
├── store/               # Redux store configuration
│   ├── slices/          # Redux slices for state management
│   └── index.ts         # Store setup
├── types/               # TypeScript type definitions
├── utils/               # Utility functions
├── pages/               # Main route components
└── App.tsx              # Main application component
```

## 🔍 Usage Examples

### Creating a Contact Form
1. Navigate to `/create`
2. Add fields: Name (text), Email (text with email validation), Phone (number), Message (textarea)
3. Configure validation rules for each field
4. Save with name "Contact Form"

### Setting up Derived Fields
1. Add "Date of Birth" (date field)
2. Add "Age" field and mark as derived
3. Select "Date of Birth" as parent field
4. Define age calculation formula
5. Preview to see auto-calculation in action

### Form Management
1. Visit `/myforms` to see all saved forms
2. Click any form to preview it
3. Delete forms you no longer need
4. Forms persist across browser sessions

## 🐛 Troubleshooting

### Common Issues

**Forms not saving:**
- Check browser localStorage is enabled
- Ensure you've entered a form name before saving
- Clear browser cache if issues persist

**Derived fields not updating:**
- Verify parent fields are properly selected
- Check that parent field types match expected input
- Ensure derivation formula is syntactically correct

**Validation not working:**
- Confirm validation rules are properly configured
- Check that field types match validation rule types
- Verify required field toggles are set correctly

## 🚀 Future Enhancements

Potential features for future versions:
- **Backend Integration**: API support for server-side form storage
- **Advanced Field Types**: File upload, signature, geolocation fields
- **Conditional Logic**: Show/hide fields based on other field values
- **Form Templates**: Pre-built form templates for common use cases
- **Export Capabilities**: Export forms as JSON or integrate with external services
- **Collaboration**: Multi-user form editing and sharing
- **Analytics**: Form submission tracking and analysis

## 🤝 Contributing

This project was built as part of a technical assessment. If you're interested in contributing or have suggestions:

1. Fork the repository
2. Create a feature branch
3. Make your changes with proper testing
4. Submit a pull request with detailed description

## 📄 License

This project is created for educational and assessment purposes.

## 📞 Support

For questions or issues related to this implementation, please create an issue in the repository with:
- Detailed description of the problem
- Steps to reproduce
- Expected vs actual behavior
- Browser and environment information

---

**Built with ❤️ using React, TypeScript, and Material-UI**
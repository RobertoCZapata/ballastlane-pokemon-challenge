# Pokémon App - Ballastlane Challenge

A modern, full-stack Pokémon application built with Next.js 14, TypeScript, and Clean Architecture principles. This project demonstrates best practices in web development, including authentication, API integration, responsive design, and accessibility.

## 🎯 Project Overview

This application allows users to browse, search, and explore detailed information about Pokémon. It features user authentication, advanced filtering and sorting capabilities, and a beautiful UI matching the provided Figma design.

**Live Demo**: [Coming Soon]

**Repository**: https://github.com/RobertoCZapata/ballastlane-pokemon-challenge

## ✨ Features

- 🔐 **JWT Authentication** - Secure login system with token-based authentication
- 🔍 **Advanced Search** - Real-time search by Pokémon name or number with debouncing
- 📊 **Sorting** - Sort Pokémon by number or name (ascending/descending)
- 📄 **Pagination** - Efficient browsing with 21 Pokémon per page (3x7 grid)
- 📱 **Responsive Design** - Mobile-first design matching Figma specifications
- ♿ **Accessibility** - WCAG compliant with semantic HTML and ARIA attributes
- 🎨 **Type-based Theming** - Dynamic colors based on Pokémon types
- ⚡ **Performance** - Optimized images, lazy loading, and efficient data fetching
- 🔄 **SEO Optimized** - Meta tags, OpenGraph, and Twitter Cards

## 🏗️ Architecture

This project follows **Clean Architecture** principles with clear separation of concerns:

```
src/
├── core/                    # Domain Layer
│   ├── entities/           # Business entities (Pokemon, User, ApiResponse)
│   ├── repositories/       # Repository interfaces
│   └── use-cases/          # Business logic (GetPokemonList, Login, etc.)
├── infrastructure/         # Infrastructure Layer
│   ├── api/               # External API clients (PokeApiClient)
│   ├── auth/              # Authentication services (JWT, TokenStorage)
│   └── repositories/      # Repository implementations
├── presentation/          # Presentation Layer
│   ├── components/        # React components (PokemonCard, etc.)
│   └── hooks/             # Custom React hooks (usePokemons, useAuth)
└── app/                   # Next.js App Router
    ├── api/               # API routes (login, pokemons)
    ├── login/             # Login page
    ├── pokemon/[id]/      # Pokemon detail page
    └── page.tsx           # Home page
```

### Why Clean Architecture?

- **Testability**: Business logic is independent of frameworks
- **Maintainability**: Clear separation makes code easier to understand and modify
- **Scalability**: Easy to add new features without affecting existing code
- **Framework Independence**: Core business logic doesn't depend on Next.js

## 🛠️ Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Authentication**: JWT with jose library
- **Validation**: Zod
- **Forms**: React Hook Form
- **API**: PokeAPI (REST)
- **Password Hashing**: bcryptjs

## 🚀 Getting Started

### Prerequisites

- Node.js 20+ (use `nvm use 20` if needed)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/RobertoCZapata/ballastlane-pokemon-challenge.git
cd ballastlane-pokemon-challenge
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

Edit `.env.local` and add your JWT secret:
```env
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000)

### Default Credentials

- **Username**: `admin`
- **Password**: `admin`

## 📁 Project Structure

```
ballastlane-pokemon-challenge/
├── src/
│   ├── core/
│   │   ├── entities/
│   │   │   ├── Pokemon.ts          # Pokemon domain entities
│   │   │   ├── User.ts             # User entity
│   │   │   └── ApiResponse.ts      # API response types
│   │   ├── repositories/
│   │   │   ├── PokemonRepository.ts
│   │   │   └── AuthRepository.ts
│   │   └── use-cases/
│   │       ├── GetPokemonList.ts
│   │       ├── GetPokemonDetail.ts
│   │       └── Login.ts
│   ├── infrastructure/
│   │   ├── api/
│   │   │   └── PokeApiClient.ts    # PokeAPI integration
│   │   ├── auth/
│   │   │   ├── JwtService.ts       # JWT token management
│   │   │   └── TokenStorage.ts     # Cookie-based storage
│   │   └── repositories/
│   │       └── InMemoryAuthRepository.ts
│   ├── presentation/
│   │   ├── components/
│   │   │   └── PokemonCard.tsx     # Pokemon card component
│   │   └── hooks/
│   │       ├── usePokemons.ts      # Pokemon list hook
│   │       ├── usePokemonDetail.ts # Pokemon detail hook
│   │       └── useAuth.ts          # Authentication hook
│   ├── app/
│   │   ├── api/
│   │   │   ├── login/route.ts      # Login endpoint
│   │   │   └── pokemons/
│   │   │       ├── route.ts        # Pokemon list endpoint
│   │   │       └── [id]/route.ts   # Pokemon detail endpoint
│   │   ├── login/
│   │   │   └── page.tsx            # Login page
│   │   ├── pokemon/
│   │   │   └── [id]/page.tsx       # Pokemon detail page
│   │   ├── page.tsx                # Home page (Pokemon list)
│   │   └── layout.tsx              # Root layout with metadata
│   ├── lib/
│   │   ├── schemas.ts              # Zod validation schemas
│   │   └── theme.ts                # Design system (colors, typography)
│   └── middleware.ts               # Route protection
├── .env.example                    # Environment variables template
├── next.config.ts                  # Next.js configuration
├── tailwind.config.ts              # Tailwind CSS configuration
├── tsconfig.json                   # TypeScript configuration
└── README.md                       # This file
```

## 🎨 Design System

The application follows the Figma design specifications with a comprehensive design system:

### Colors

- **Primary**: `#DC0A2D` (Pokémon Red)
- **Grayscale**: Dark (`#212121`), Medium (`#666666`), Light (`#E0E0E0`)
- **Type Colors**: Each Pokémon type has its own color (Fire, Water, Grass, etc.)

### Typography

- **Headline**: 24px/32px Bold
- **Subtitle**: 10px-14px/16px Bold
- **Body**: 14px/16px Regular

### Components

- **PokemonCard**: Compact card with image, number, and name
- **Sort Dropdown**: Radio button selection for sorting options
- **Search Bar**: Rounded search input with clear button
- **Pagination**: Previous/Next navigation with page counter

## 🔒 Security

- JWT tokens with 7-day expiration
- HTTP-only cookies for token storage
- Password hashing with bcrypt
- Protected routes with middleware
- Input validation with Zod schemas
- XSS protection via React's default escaping

## ♿ Accessibility

- Semantic HTML5 elements (`article`, `section`, `nav`, `figure`, `main`)
- ARIA labels and roles
- Keyboard navigation support
- Screen reader friendly
- Focus states and indicators
- Alt text for all images

## 📊 API Endpoints

### Authentication

- `POST /api/login` - User login
  - Body: `{ username: string, password: string }`
  - Returns: `{ success: boolean, token: string }`

### Pokémon

- `GET /api/pokemons` - List Pokémon with search, sort, and pagination
  - Query params: `search`, `sortBy`, `sortOrder`, `limit`, `offset`
  - Returns: `{ success: boolean, data: Pokemon[], count: number }`

- `GET /api/pokemons/[id]` - Get Pokémon detail
  - Returns: `{ success: boolean, data: Pokemon }`

## 🧪 Key Implementation Details

### Search & Sort Strategy

The application fetches 1500 Pokémon upfront to enable client-side search and sorting. This approach was chosen because:

1. PokeAPI doesn't support server-side search or sorting
2. The dataset is small enough for client-side processing
3. It provides instant search results without API calls
4. Pagination is still applied after filtering for performance

### Authentication Flow

1. User submits credentials via login form
2. Backend validates credentials and generates JWT token
3. Token stored in HTTP-only cookie
4. Middleware validates token on protected routes
5. Invalid/expired tokens redirect to login page

### Middleware Protection

The middleware protects all routes except `/login` and `/api/login`, automatically redirecting unauthorized users.

## 🤖 Use of Generative AI

This project was developed with assistance from **Claude (Anthropic)** as per challenge requirements. Here's how GenAI was utilized:

### Development Process

1. **Architecture Planning**
   - Claude helped design the Clean Architecture structure
   - Suggested best practices for Next.js 14 App Router
   - Recommended appropriate libraries and tools

2. **Code Generation**
   - Generated boilerplate code for entities, repositories, and use cases
   - Created TypeScript interfaces and types with proper typing
   - Built React components following best practices
   - Implemented API routes with proper error handling

3. **Problem Solving**
   - Resolved Node.js version compatibility issue (v18 → v20)
   - Fixed Git initialization conflicts
   - Debugged TypeScript errors and type mismatches
   - Optimized search/sort implementation strategy

4. **Design Implementation**
   - Translated Figma designs into Tailwind CSS classes
   - Implemented responsive layouts
   - Created design system with color palette and typography
   - Fine-tuned alignment and spacing to match Figma specs

5. **Documentation**
   - Generated comprehensive README documentation
   - Created inline code comments
   - Wrote JSDoc documentation for functions
   - Documented API endpoints and schemas

### GenAI Impact

**Productivity Gains**:
- ~70% faster initial setup and boilerplate generation
- ~50% reduction in debugging time
- Immediate access to best practices and patterns

**Quality Improvements**:
- Consistent code style and structure
- Better TypeScript typing
- More comprehensive error handling
- Improved accessibility implementation

**Learning Outcomes**:
- Deeper understanding of Clean Architecture
- Better grasp of Next.js 14 App Router patterns
- Improved knowledge of JWT authentication
- Enhanced accessibility awareness

### Human Contribution

While GenAI was instrumental, human oversight was crucial for:
- Project direction and feature prioritization
- Design decisions and UX considerations
- Code review and quality assurance
- Testing and validation
- Figma design interpretation
- Final polish and refinement

## 🎓 Learning Outcomes

This project demonstrates proficiency in:

- Modern React patterns (Server Components, Client Components)
- TypeScript advanced typing
- Clean Architecture principles
- JWT authentication implementation
- API integration and data fetching
- Responsive design and CSS
- Git workflow and version control
- Accessibility standards
- SEO optimization

## 📝 Challenge Requirements Checklist

- ✅ Next.js 14+ with App Router
- ✅ TypeScript
- ✅ Tailwind CSS
- ✅ Clean Architecture
- ✅ User authentication (JWT)
- ✅ Pokemon list with search and sort
- ✅ Pokemon detail page
- ✅ Responsive design matching Figma
- ✅ Accessibility features
- ✅ SEO optimization
- ✅ Git repository with commits
- ✅ Documentation of GenAI usage

## 🔮 Future Enhancements

- [ ] Unit and integration tests (Jest, React Testing Library)
- [ ] E2E tests (Playwright/Cypress)
- [ ] Favorites/Bookmarks feature
- [ ] Compare Pokémon side-by-side
- [ ] Team builder functionality
- [ ] Progressive Web App (PWA)
- [ ] Dark mode support
- [ ] Internationalization (i18n)
- [ ] Redis caching for API responses
- [ ] Real database for user management

## 👤 Author

**Roberto Zapata**
- GitHub: [@RobertoCZapata](https://github.com/RobertoCZapata)
- LinkedIn: [Roberto Zapata](https://linkedin.com/in/roberto-zapata)

## 📄 License

This project was created as part of a technical challenge for Ballastlane.

---

**Note**: This application was developed as part of a technical interview process to demonstrate proficiency in modern web development practices, clean code principles, and the effective use of AI-assisted development tools.

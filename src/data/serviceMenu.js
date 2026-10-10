// Lightweight nav menu data for the Navbar Services dropdown.
// Kept free of icon imports so the client navbar bundle stays small.
export const SERVICE_MENU = [
  {
    id: 'services',
    label: 'ESeva & Finance',
    services: [
      { title: 'CSC & E-Seva Online Services', href: '/service/csc' },
      { title: 'Document Registration', href: '/service/document-registration' },
      { title: 'Ticket Booking', href: '/service/ticket-booking' },
      { title: 'Insurance Services', href: '/service/insurance' },
      { title: 'Banking Services', href: '/service/banking' },
      { title: 'Postal Services', href: '/service/postal' },
      { title: 'Business Registration', href: '/service/business-registration' },
    ],
  },
  {
    id: 'tech',
    label: 'Tech & Software',
    services: [
      { title: 'Software Development', href: '/service/digital-solutions' },
      { title: 'Computer Accessories', href: '/service/computer-accessories' },
      { title: 'Mobile Accessories', href: '/service/mobile-accessories' },
    ],
  },
  {
    id: 'retail',
    label: 'Retail & Essentials',
    services: [
      { title: 'Project & Designing Work', href: '/service/project-binding' },
      { title: 'Stationary', href: '/service/stationary' },
      { title: 'Journals & Books', href: '/service/journals-books' },
      { title: 'Organic Foods', href: '/service/organic-foods' },
    ],
  },
];
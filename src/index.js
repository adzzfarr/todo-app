// index.js
import './styles.css';
import { renderSidebar } from './dom/sidebar.js';
import { loadProjects } from './storage.js';

const projects = loadProjects();

renderSidebar(projects);
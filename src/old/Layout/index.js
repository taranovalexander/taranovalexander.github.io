import Template from './tpl.hbs';
import './style.css';

const Layout = {
  template: Template,
  render(node, data) {
    node.innerHTML = Template(data);
  }
};

export default Layout;

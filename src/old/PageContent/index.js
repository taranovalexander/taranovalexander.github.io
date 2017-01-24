import Template from './tpl.hbs';
import './style.css';

const PageContent = {
  template: Template,
  render(node, data) {
    node.innerHTML = Template(data);
  }
};

export default PageContent;

import Template from './tpl.hbs';
import './style.css';

const PageIntro = {
  template: Template,
  render(node, data, classNames) {
    const container = document.createElement('div');
    container.className = classNames;
    container.innerHTML = Template(data);
    node.appendChild(container);
  }
};

export default PageIntro;

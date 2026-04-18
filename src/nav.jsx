import { Link } from "react-router-dom";
import {servicesA} from "./home2"

function Services() {
  return (
    <div>
      {servicesA.map((service) => (
        <Link to={service.path} key={service.id}>
          <div>
            <h3>{service.icon} {service.title}</h3>
            <p>{service.desc}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default Services;
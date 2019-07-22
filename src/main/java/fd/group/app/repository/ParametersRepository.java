package fd.group.app.repository;

import fd.group.app.domain.Parameters;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Parameters entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ParametersRepository extends JpaRepository<Parameters, Long> {

}

package fd.group.app.service;

import fd.group.app.domain.Parameters;
import fd.group.app.repository.ParametersRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing {@link Parameters}.
 */
@Service
@Transactional
public class ParametersService {

    private final Logger log = LoggerFactory.getLogger(ParametersService.class);

    private final ParametersRepository parametersRepository;

    public ParametersService(ParametersRepository parametersRepository) {
        this.parametersRepository = parametersRepository;
    }

    /**
     * Save a parameters.
     *
     * @param parameters the entity to save.
     * @return the persisted entity.
     */
    public Parameters save(Parameters parameters) {
        log.debug("Request to save Parameters : {}", parameters);
        return parametersRepository.save(parameters);
    }

    /**
     * Get all the parameters.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public Page<Parameters> findAll(Pageable pageable) {
        log.debug("Request to get all Parameters");
        return parametersRepository.findAll(pageable);
    }


    /**
     * Get one parameters by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<Parameters> findOne(Long id) {
        log.debug("Request to get Parameters : {}", id);
        return parametersRepository.findById(id);
    }

    /**
     * Delete the parameters by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete Parameters : {}", id);
        parametersRepository.deleteById(id);
    }
}

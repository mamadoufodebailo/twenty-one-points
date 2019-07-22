package fd.group.app.service.impl;

import fd.group.app.service.BloodPressureService;
import fd.group.app.domain.BloodPressure;
import fd.group.app.repository.BloodPressureRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing {@link BloodPressure}.
 */
@Service
@Transactional
public class BloodPressureServiceImpl implements BloodPressureService {

    private final Logger log = LoggerFactory.getLogger(BloodPressureServiceImpl.class);

    private final BloodPressureRepository bloodPressureRepository;

    public BloodPressureServiceImpl(BloodPressureRepository bloodPressureRepository) {
        this.bloodPressureRepository = bloodPressureRepository;
    }

    /**
     * Save a bloodPressure.
     *
     * @param bloodPressure the entity to save.
     * @return the persisted entity.
     */
    @Override
    public BloodPressure save(BloodPressure bloodPressure) {
        log.debug("Request to save BloodPressure : {}", bloodPressure);
        return bloodPressureRepository.save(bloodPressure);
    }

    /**
     * Get all the bloodPressures.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public Page<BloodPressure> findAll(Pageable pageable) {
        log.debug("Request to get all BloodPressures");
        return bloodPressureRepository.findAll(pageable);
    }


    /**
     * Get one bloodPressure by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<BloodPressure> findOne(Long id) {
        log.debug("Request to get BloodPressure : {}", id);
        return bloodPressureRepository.findById(id);
    }

    /**
     * Delete the bloodPressure by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete BloodPressure : {}", id);
        bloodPressureRepository.deleteById(id);
    }
}

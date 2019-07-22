package fd.group.app.service.impl;

import fd.group.app.service.WeightService;
import fd.group.app.domain.Weight;
import fd.group.app.repository.WeightRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing {@link Weight}.
 */
@Service
@Transactional
public class WeightServiceImpl implements WeightService {

    private final Logger log = LoggerFactory.getLogger(WeightServiceImpl.class);

    private final WeightRepository weightRepository;

    public WeightServiceImpl(WeightRepository weightRepository) {
        this.weightRepository = weightRepository;
    }

    /**
     * Save a weight.
     *
     * @param weight the entity to save.
     * @return the persisted entity.
     */
    @Override
    public Weight save(Weight weight) {
        log.debug("Request to save Weight : {}", weight);
        return weightRepository.save(weight);
    }

    /**
     * Get all the weights.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public Page<Weight> findAll(Pageable pageable) {
        log.debug("Request to get all Weights");
        return weightRepository.findAll(pageable);
    }


    /**
     * Get one weight by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<Weight> findOne(Long id) {
        log.debug("Request to get Weight : {}", id);
        return weightRepository.findById(id);
    }

    /**
     * Delete the weight by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Weight : {}", id);
        weightRepository.deleteById(id);
    }
}

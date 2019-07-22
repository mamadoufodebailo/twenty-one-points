package fd.group.app.web.rest;

import fd.group.app.domain.Parameters;
import fd.group.app.service.ParametersService;
import fd.group.app.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.util.MultiValueMap;
import org.springframework.web.util.UriComponentsBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link fd.group.app.domain.Parameters}.
 */
@RestController
@RequestMapping("/api")
public class ParametersResource {

    private final Logger log = LoggerFactory.getLogger(ParametersResource.class);

    private static final String ENTITY_NAME = "parameters";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ParametersService parametersService;

    public ParametersResource(ParametersService parametersService) {
        this.parametersService = parametersService;
    }

    /**
     * {@code POST  /parameters} : Create a new parameters.
     *
     * @param parameters the parameters to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new parameters, or with status {@code 400 (Bad Request)} if the parameters has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/parameters")
    public ResponseEntity<Parameters> createParameters(@RequestBody Parameters parameters) throws URISyntaxException {
        log.debug("REST request to save Parameters : {}", parameters);
        if (parameters.getId() != null) {
            throw new BadRequestAlertException("A new parameters cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Parameters result = parametersService.save(parameters);
        return ResponseEntity.created(new URI("/api/parameters/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /parameters} : Updates an existing parameters.
     *
     * @param parameters the parameters to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated parameters,
     * or with status {@code 400 (Bad Request)} if the parameters is not valid,
     * or with status {@code 500 (Internal Server Error)} if the parameters couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/parameters")
    public ResponseEntity<Parameters> updateParameters(@RequestBody Parameters parameters) throws URISyntaxException {
        log.debug("REST request to update Parameters : {}", parameters);
        if (parameters.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Parameters result = parametersService.save(parameters);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, parameters.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /parameters} : get all the parameters.
     *
     * @param pageable the pagination information.
     * @param queryParams a {@link MultiValueMap} query parameters.
     * @param uriBuilder a {@link UriComponentsBuilder} URI builder.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of parameters in body.
     */
    @GetMapping("/parameters")
    public ResponseEntity<List<Parameters>> getAllParameters(Pageable pageable, @RequestParam MultiValueMap<String, String> queryParams, UriComponentsBuilder uriBuilder) {
        log.debug("REST request to get a page of Parameters");
        Page<Parameters> page = parametersService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(uriBuilder.queryParams(queryParams), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /parameters/:id} : get the "id" parameters.
     *
     * @param id the id of the parameters to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the parameters, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/parameters/{id}")
    public ResponseEntity<Parameters> getParameters(@PathVariable Long id) {
        log.debug("REST request to get Parameters : {}", id);
        Optional<Parameters> parameters = parametersService.findOne(id);
        return ResponseUtil.wrapOrNotFound(parameters);
    }

    /**
     * {@code DELETE  /parameters/:id} : delete the "id" parameters.
     *
     * @param id the id of the parameters to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/parameters/{id}")
    public ResponseEntity<Void> deleteParameters(@PathVariable Long id) {
        log.debug("REST request to delete Parameters : {}", id);
        parametersService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}

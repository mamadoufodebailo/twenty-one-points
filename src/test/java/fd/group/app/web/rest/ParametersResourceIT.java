package fd.group.app.web.rest;

import fd.group.app.TwentyOnePointsApp;
import fd.group.app.domain.Parameters;
import fd.group.app.repository.ParametersRepository;
import fd.group.app.service.ParametersService;
import fd.group.app.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.List;

import static fd.group.app.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import fd.group.app.domain.enumeration.Units;
/**
 * Integration tests for the {@Link ParametersResource} REST controller.
 */
@SpringBootTest(classes = TwentyOnePointsApp.class)
public class ParametersResourceIT {

    private static final Integer DEFAULT_WEEKLY_GOAL = 1;
    private static final Integer UPDATED_WEEKLY_GOAL = 2;

    private static final Units DEFAULT_WEIGHT = Units.KG;
    private static final Units UPDATED_WEIGHT = Units.LB;

    @Autowired
    private ParametersRepository parametersRepository;

    @Autowired
    private ParametersService parametersService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restParametersMockMvc;

    private Parameters parameters;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ParametersResource parametersResource = new ParametersResource(parametersService);
        this.restParametersMockMvc = MockMvcBuilders.standaloneSetup(parametersResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Parameters createEntity(EntityManager em) {
        Parameters parameters = new Parameters()
            .weeklyGoal(DEFAULT_WEEKLY_GOAL)
            .weight(DEFAULT_WEIGHT);
        return parameters;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Parameters createUpdatedEntity(EntityManager em) {
        Parameters parameters = new Parameters()
            .weeklyGoal(UPDATED_WEEKLY_GOAL)
            .weight(UPDATED_WEIGHT);
        return parameters;
    }

    @BeforeEach
    public void initTest() {
        parameters = createEntity(em);
    }

    @Test
    @Transactional
    public void createParameters() throws Exception {
        int databaseSizeBeforeCreate = parametersRepository.findAll().size();

        // Create the Parameters
        restParametersMockMvc.perform(post("/api/parameters")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(parameters)))
            .andExpect(status().isCreated());

        // Validate the Parameters in the database
        List<Parameters> parametersList = parametersRepository.findAll();
        assertThat(parametersList).hasSize(databaseSizeBeforeCreate + 1);
        Parameters testParameters = parametersList.get(parametersList.size() - 1);
        assertThat(testParameters.getWeeklyGoal()).isEqualTo(DEFAULT_WEEKLY_GOAL);
        assertThat(testParameters.getWeight()).isEqualTo(DEFAULT_WEIGHT);
    }

    @Test
    @Transactional
    public void createParametersWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = parametersRepository.findAll().size();

        // Create the Parameters with an existing ID
        parameters.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restParametersMockMvc.perform(post("/api/parameters")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(parameters)))
            .andExpect(status().isBadRequest());

        // Validate the Parameters in the database
        List<Parameters> parametersList = parametersRepository.findAll();
        assertThat(parametersList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllParameters() throws Exception {
        // Initialize the database
        parametersRepository.saveAndFlush(parameters);

        // Get all the parametersList
        restParametersMockMvc.perform(get("/api/parameters?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(parameters.getId().intValue())))
            .andExpect(jsonPath("$.[*].weeklyGoal").value(hasItem(DEFAULT_WEEKLY_GOAL)))
            .andExpect(jsonPath("$.[*].weight").value(hasItem(DEFAULT_WEIGHT.toString())));
    }
    
    @Test
    @Transactional
    public void getParameters() throws Exception {
        // Initialize the database
        parametersRepository.saveAndFlush(parameters);

        // Get the parameters
        restParametersMockMvc.perform(get("/api/parameters/{id}", parameters.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(parameters.getId().intValue()))
            .andExpect(jsonPath("$.weeklyGoal").value(DEFAULT_WEEKLY_GOAL))
            .andExpect(jsonPath("$.weight").value(DEFAULT_WEIGHT.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingParameters() throws Exception {
        // Get the parameters
        restParametersMockMvc.perform(get("/api/parameters/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateParameters() throws Exception {
        // Initialize the database
        parametersService.save(parameters);

        int databaseSizeBeforeUpdate = parametersRepository.findAll().size();

        // Update the parameters
        Parameters updatedParameters = parametersRepository.findById(parameters.getId()).get();
        // Disconnect from session so that the updates on updatedParameters are not directly saved in db
        em.detach(updatedParameters);
        updatedParameters
            .weeklyGoal(UPDATED_WEEKLY_GOAL)
            .weight(UPDATED_WEIGHT);

        restParametersMockMvc.perform(put("/api/parameters")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedParameters)))
            .andExpect(status().isOk());

        // Validate the Parameters in the database
        List<Parameters> parametersList = parametersRepository.findAll();
        assertThat(parametersList).hasSize(databaseSizeBeforeUpdate);
        Parameters testParameters = parametersList.get(parametersList.size() - 1);
        assertThat(testParameters.getWeeklyGoal()).isEqualTo(UPDATED_WEEKLY_GOAL);
        assertThat(testParameters.getWeight()).isEqualTo(UPDATED_WEIGHT);
    }

    @Test
    @Transactional
    public void updateNonExistingParameters() throws Exception {
        int databaseSizeBeforeUpdate = parametersRepository.findAll().size();

        // Create the Parameters

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restParametersMockMvc.perform(put("/api/parameters")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(parameters)))
            .andExpect(status().isBadRequest());

        // Validate the Parameters in the database
        List<Parameters> parametersList = parametersRepository.findAll();
        assertThat(parametersList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteParameters() throws Exception {
        // Initialize the database
        parametersService.save(parameters);

        int databaseSizeBeforeDelete = parametersRepository.findAll().size();

        // Delete the parameters
        restParametersMockMvc.perform(delete("/api/parameters/{id}", parameters.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Parameters> parametersList = parametersRepository.findAll();
        assertThat(parametersList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Parameters.class);
        Parameters parameters1 = new Parameters();
        parameters1.setId(1L);
        Parameters parameters2 = new Parameters();
        parameters2.setId(parameters1.getId());
        assertThat(parameters1).isEqualTo(parameters2);
        parameters2.setId(2L);
        assertThat(parameters1).isNotEqualTo(parameters2);
        parameters1.setId(null);
        assertThat(parameters1).isNotEqualTo(parameters2);
    }
}

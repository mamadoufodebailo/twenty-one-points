package fd.group.app.domain;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;

import fd.group.app.domain.enumeration.Units;

/**
 * A Parameters.
 */
@Entity
@Table(name = "parameters")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Parameters implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "weekly_goal")
    private Integer weeklyGoal;

    @Enumerated(EnumType.STRING)
    @Column(name = "weight")
    private Units weight;

    @OneToOne
    @JoinColumn(unique = true)
    private User parameter;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getWeeklyGoal() {
        return weeklyGoal;
    }

    public Parameters weeklyGoal(Integer weeklyGoal) {
        this.weeklyGoal = weeklyGoal;
        return this;
    }

    public void setWeeklyGoal(Integer weeklyGoal) {
        this.weeklyGoal = weeklyGoal;
    }

    public Units getWeight() {
        return weight;
    }

    public Parameters weight(Units weight) {
        this.weight = weight;
        return this;
    }

    public void setWeight(Units weight) {
        this.weight = weight;
    }

    public User getParameter() {
        return parameter;
    }

    public Parameters parameter(User user) {
        this.parameter = user;
        return this;
    }

    public void setParameter(User user) {
        this.parameter = user;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Parameters)) {
            return false;
        }
        return id != null && id.equals(((Parameters) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Parameters{" +
            "id=" + getId() +
            ", weeklyGoal=" + getWeeklyGoal() +
            ", weight='" + getWeight() + "'" +
            "}";
    }
}

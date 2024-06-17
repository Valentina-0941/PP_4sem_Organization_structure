package ft.root.repository;

import ft.root.entity.Record;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RecordRepository extends CrudRepository<Record, Long> {

}
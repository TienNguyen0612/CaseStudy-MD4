package get.high.model.entity;

import javax.persistence.*;

@Entity
@Table(name = "group_member")
public class GroupMember {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Integer status;


    @ManyToOne
    @JoinColumn(name = "userinfo_id")
    private UserInfo userInfo;

    @ManyToOne
    @JoinColumn(name = "groups_id")
    private Groups groups;

    public GroupMember() {
    }

    public GroupMember(Integer status, UserInfo userInfo, Groups groups) {
        this.status = status;
        this.userInfo = userInfo;
        this.groups = groups;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public UserInfo getUserInfo() {
        return userInfo;
    }

    public void setUserInfo(UserInfo userInfo) {
        this.userInfo = userInfo;
    }

    public Groups getGroups() {
        return groups;
    }

    public void setGroups(Groups groups) {
        this.groups = groups;
    }
}
